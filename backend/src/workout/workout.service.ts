import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WorkoutLog, WorkoutSet } from './workout-log.entity';
import { WorkoutTemplate } from './workout-template.entity';
import { CreateWorkoutLogDto, WorkoutSetDto } from './dto/workout.dto';
import { AchievementsService } from '../achievements/achievements.service';
import * as dayjs from 'dayjs';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutLog)
    private readonly logRepo: Repository<WorkoutLog>,
    @InjectRepository(WorkoutSet)
    private readonly setRepo: Repository<WorkoutSet>,
    @InjectRepository(WorkoutTemplate)
    private readonly templateRepo: Repository<WorkoutTemplate>,
    private readonly achievementsService: AchievementsService,
  ) {}

  async getTemplates(query?: string): Promise<WorkoutTemplate[]> {
    const qb = this.templateRepo.createQueryBuilder('t');
    if (query) qb.where('t.name LIKE :q', { q: `%${query}%` });
    return qb.orderBy('t.name', 'ASC').getMany();
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
