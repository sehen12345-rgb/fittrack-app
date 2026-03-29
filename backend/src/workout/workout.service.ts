import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WorkoutLog, WorkoutSet } from './workout-log.entity';
import { WorkoutTemplate } from './workout-template.entity';
import { CreateWorkoutLogDto, WorkoutSetDto } from './dto/workout.dto';
import { WorkoutCategory } from '../common/enums';
import { AchievementsService } from '../achievements/achievements.service';
import * as dayjs from 'dayjs';

// wger API 카테고리 → WorkoutCategory
const WGER_CATEGORY: Record<number, WorkoutCategory> = {
  10: WorkoutCategory.STRENGTH, // Abs
  8:  WorkoutCategory.STRENGTH, // Arms
  12: WorkoutCategory.STRENGTH, // Back
  14: WorkoutCategory.STRENGTH, // Calves
  11: WorkoutCategory.STRENGTH, // Chest
  9:  WorkoutCategory.STRENGTH, // Legs
  13: WorkoutCategory.STRENGTH, // Shoulders
};

// wger 근육 ID → 내부 키
const WGER_MUSCLE: Record<number, string> = {
  1: 'biceps', 2: 'shoulders', 3: 'serratus', 4: 'chest',
  5: 'hamstrings', 6: 'calves', 7: 'glutes', 8: 'back',
  9: 'obliques', 10: 'quads', 11: 'abs', 12: 'traps',
  13: 'triceps', 14: 'brachialis', 15: 'rear_delts', 16: 'soleus',
};

// wger 장비 ID → 내부 키
const WGER_EQUIPMENT: Record<number, string> = {
  1: 'barbell', 2: 'ez_bar', 3: 'dumbbell', 4: 'mat',
  5: 'swiss_ball', 6: 'pullup_bar', 7: 'weight_plate',
  9: 'resistance_band', 10: 'kettlebell', 11: 'machine', 12: 'cable_machine',
};

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, ' ').trim();
}

@Injectable()
export class WorkoutService implements OnModuleInit {
  private readonly logger = new Logger(WorkoutService.name);

  constructor(
    @InjectRepository(WorkoutLog)
    private readonly logRepo: Repository<WorkoutLog>,
    @InjectRepository(WorkoutSet)
    private readonly setRepo: Repository<WorkoutSet>,
    @InjectRepository(WorkoutTemplate)
    private readonly templateRepo: Repository<WorkoutTemplate>,
    private readonly achievementsService: AchievementsService,
  ) {}

  async onModuleInit() {
    const count = await this.templateRepo.count();
    if (count < 200) {
      this.logger.log('wger API 동기화 시작...');
      const { added } = await this.syncFromWger();
      this.logger.log(`wger 동기화 완료: ${added}개 추가`);
    }
  }

  // ───── wger API 헬퍼 ─────

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
    ]);
  }

  private mapWgerCategory(catId?: number): WorkoutCategory {
    return (catId && WGER_CATEGORY[catId]) || WorkoutCategory.STRENGTH;
  }

  private mapWgerMuscles(muscles: any[]): string[] {
    return [...new Set(muscles.map(m => WGER_MUSCLE[m.id]).filter(Boolean))];
  }

  private mapWgerEquipment(equip: any[]): string[] {
    return [...new Set(equip.map(e => WGER_EQUIPMENT[e.id]).filter(Boolean))];
  }

  private toTemplate(ex: any): Partial<WorkoutTemplate> {
    return {
      name: ex.name,
      category: this.mapWgerCategory(ex.category?.id),
      targetMuscleGroups: this.mapWgerMuscles([...(ex.muscles ?? []), ...(ex.muscles_secondary ?? [])]),
      equipmentRequired: this.mapWgerEquipment(ex.equipment ?? []),
      description: ex.description ? stripHtml(ex.description).slice(0, 500) || null : null,
      isSystem: true,
    };
  }

  async syncFromWger(): Promise<{ added: number }> {
    let url: string | null = 'https://wger.de/api/v2/exercise/?format=json&language=2&limit=100&ordering=id';
    let added = 0;
    const existingNames = new Set(
      (await this.templateRepo.find({ select: ['name'] })).map(t => t.name),
    );

    while (url) {
      try {
        const res = await this.withTimeout(fetch(url), 10000);
        if (!res.ok) break;
        const json: any = await res.json();

        const toSave = (json.results as any[])
          .filter(ex => ex.name && !existingNames.has(ex.name))
          .map(ex => {
            existingNames.add(ex.name);
            return this.templateRepo.create(this.toTemplate(ex));
          });

        if (toSave.length > 0) {
          await this.templateRepo.save(toSave);
          added += toSave.length;
        }
        url = json.next ?? null;
      } catch {
        break;
      }
    }
    return { added };
  }

  // ───── 검색 (로컬 + wger 실시간 fallback) ─────

  async getTemplates(query?: string): Promise<WorkoutTemplate[]> {
    const qb = this.templateRepo.createQueryBuilder('t');
    if (query) {
      qb.where('t.name LIKE :q OR t.description LIKE :q', { q: `%${query}%` });
    }
    const local = await qb.orderBy('t.isSystem', 'DESC').addOrderBy('t.name', 'ASC').limit(50).getMany();

    if (!query || local.length >= 10) return local;

    // 로컬 결과 부족 → wger 실시간 검색
    try {
      const wgerUrl = `https://wger.de/api/v2/exercise/?format=json&language=2&limit=20&name=${encodeURIComponent(query)}`;
      const res = await this.withTimeout(fetch(wgerUrl), 4000);
      if (!res.ok) return local;
      const json: any = await res.json();

      const existingNames = new Set(local.map(t => t.name));
      const toSave = (json.results as any[])
        .filter(ex => ex.name && !existingNames.has(ex.name))
        .map(ex => {
          existingNames.add(ex.name);
          return this.templateRepo.create(this.toTemplate(ex));
        });

      if (toSave.length === 0) return local;
      const saved = await this.templateRepo.save(toSave);
      return [...local, ...saved];
    } catch {
      return local;
    }
  }

  async getTemplateHistory(userId: string, templateId: string) {
    return this.setRepo
      .createQueryBuilder('s')
      .innerJoin('s.workoutLog', 'log')
      .where('log.userId = :userId AND s.workoutTemplateId = :templateId', { userId, templateId })
      .orderBy('log.workoutDate', 'DESC')
      .select(['s.setNumber', 's.reps', 's.weightKg', 's.rpe', 'log.workoutDate'])
      .limit(50)
      .getRawMany();
  }

  async countLogDays(userId: string): Promise<number> {
    const result = await this.logRepo
      .createQueryBuilder('log')
      .select('COUNT(DISTINCT DATE(log.workoutDate))', 'days')
      .where('log.userId = :userId', { userId })
      .getRawOne();
    return Number(result.days) || 0;
  }

  async getLogs(userId: string, date: string): Promise<WorkoutLog[]> {
    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(date).endOf('day').toDate();
    return this.logRepo.find({
      where: { userId, workoutDate: Between(start, end) },
      relations: ['sets', 'sets.workoutTemplate'],
      order: { createdAt: 'ASC' },
    });
  }

  async createLog(userId: string, dto: CreateWorkoutLogDto): Promise<WorkoutLog> {
    let durationMin = 0;
    if (dto.startTime && dto.endTime) {
      durationMin = Math.round(
        (new Date(dto.endTime).getTime() - new Date(dto.startTime).getTime()) / 60000,
      );
    }

    const log = this.logRepo.create({
      userId,
      workoutDate: new Date(dto.workoutDate),
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      totalDurationMin: durationMin,
      note: dto.note,
    });
    const saved = await this.logRepo.save(log);

    if (dto.sets?.length) {
      const sets = dto.sets.map((s) =>
        this.setRepo.create({ ...s, workoutLogId: saved.id }),
      );
      await this.setRepo.save(sets);
    }

    const result = await this.logRepo.findOne({
      where: { id: saved.id },
      relations: ['sets', 'sets.workoutTemplate'],
    });

    const totalWorkouts = await this.logRepo.count({ where: { userId } });
    if (totalWorkouts === 1) {
      await this.achievementsService.unlock(userId, 'first_workout');
    }
    if (totalWorkouts >= 10) {
      await this.achievementsService.unlock(userId, '10_workouts');
    }

    return result;
  }

  async addSets(userId: string, logId: string, sets: WorkoutSetDto[]): Promise<WorkoutSet[]> {
    const log = await this.logRepo.findOne({ where: { id: logId, userId } });
    if (!log) throw new NotFoundException('운동 기록을 찾을 수 없습니다.');
    const entities = sets.map((s) => this.setRepo.create({ ...s, workoutLogId: logId }));
    return this.setRepo.save(entities);
  }

  async updateLog(userId: string, logId: string, dto: Partial<CreateWorkoutLogDto>): Promise<WorkoutLog> {
    const log = await this.logRepo.findOne({ where: { id: logId, userId } });
    if (!log) throw new NotFoundException('운동 기록을 찾을 수 없습니다.');
    Object.assign(log, {
      note: dto.note ?? log.note,
      startTime: dto.startTime ? new Date(dto.startTime) : log.startTime,
      endTime: dto.endTime ? new Date(dto.endTime) : log.endTime,
    });
    return this.logRepo.save(log);
  }

  async deleteLog(userId: string, logId: string): Promise<void> {
    const log = await this.logRepo.findOne({ where: { id: logId, userId } });
    if (!log) throw new NotFoundException('운동 기록을 찾을 수 없습니다.');
    await this.logRepo.remove(log);
  }

  async getVolumeByMuscle(userId: string, from: string, to: string) {
    return this.setRepo
      .createQueryBuilder('s')
      .innerJoin('s.workoutLog', 'log')
      .innerJoin('s.workoutTemplate', 'tmpl')
      .where('log.userId = :userId AND log.workoutDate BETWEEN :from AND :to', { userId, from, to })
      .select('tmpl.targetMuscleGroups', 'muscles')
      .addSelect('SUM(s.reps * s.weightKg)', 'volume')
      .addSelect('COUNT(s.id)', 'setCount')
      .groupBy('tmpl.targetMuscleGroups')
      .getRawMany();
  }
}
