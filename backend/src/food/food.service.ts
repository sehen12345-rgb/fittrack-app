import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FoodItem } from './food-item.entity';
import { FoodLog } from './food-log.entity';
import { CreateFoodLogDto, CreateFoodItemDto } from './dto/food.dto';
import { FoodSource } from '../common/enums';
import { AchievementsService } from '../achievements/achievements.service';
import * as dayjs from 'dayjs';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodItem)
    private readonly foodItemRepo: Repository<FoodItem>,
    @InjectRepository(FoodLog)
    private readonly foodLogRepo: Repository<FoodLog>,
    private readonly achievementsService: AchievementsService,
  ) {}

  async searchFoods(query: string, limit = 20): Promise<FoodItem[]> {
    return this.foodItemRepo
      .createQueryBuilder('food')
      .where('food.name LIKE :q OR food.brand LIKE :q', { q: `%${query}%` })
      .orderBy('food.isVerified', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findByBarcode(barcode: string): Promise<FoodItem> {
    const item = await this.foodItemRepo.findOne({ where: { barcode } });
    if (!item) throw new NotFoundException('바코드에 해당하는 음식을 찾을 수 없습니다.');
    return item;
  }

  async findFoodById(id: string): Promise<FoodItem> {
    const item = await this.foodItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('음식을 찾을 수 없습니다.');
    return item;
  }

  async createFoodItem(userId: string, dto: CreateFoodItemDto): Promise<FoodItem> {
    const item = this.foodItemRepo.create({
      ...dto,
      source: FoodSource.USER_CREATED,
      createdByUserId: userId,
      isVerified: false,
    });
    return this.foodItemRepo.save(item);
  }

  async getFrequentFoods(userId: string, limit = 10): Promise<any[]> {
    return this.foodLogRepo
      .createQueryBuilder('log')
      .select('log.foodItemId')
      .addSelect('COUNT(log.id)', 'count')
      .addSelect('food.name', 'name')
      .addSelect('food.caloriesPerServing', 'calories')
      .innerJoin('log.foodItem', 'food')
      .where('log.userId = :userId', { userId })
      .groupBy('log.foodItemId')
      .addGroupBy('food.name')
      .addGroupBy('food.caloriesPerServing')
      .orderBy('count', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getRecentFoods(userId: string, limit = 10): Promise<FoodLog[]> {
    return this.foodLogRepo
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.foodItem', 'food')
      .where('log.userId = :userId', { userId })
      .orderBy('log.loggedAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async getLogs(userId: string, date: string): Promise<FoodLog[]> {
    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(date).endOf('day').toDate();
    return this.foodLogRepo.find({
      where: { userId, loggedAt: Between(start, end) },
      relations: ['foodItem'],
      order: { loggedAt: 'ASC' },
    });
  }

  async getDailySummary(userId: string, date: string) {
    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(date).endOf('day').toDate();
    const result = await this.foodLogRepo
      .createQueryBuilder('log')
      .select('SUM(log.caloriesConsumed)', 'totalCalories')
      .addSelect('SUM(log.proteinConsumed)', 'totalProtein')
      .addSelect('SUM(log.carbConsumed)', 'totalCarb')
      .addSelect('SUM(log.fatConsumed)', 'totalFat')
      .where('log.userId = :userId AND log.loggedAt BETWEEN :start AND :end', { userId, start, end })
      .getRawOne();
    return {
      totalCalories: Number(result.totalCalories) || 0,
      totalProtein: Number(result.totalProtein) || 0,
      totalCarb: Number(result.totalCarb) || 0,
      totalFat: Number(result.totalFat) || 0,
    };
  }

  async createLog(userId: string, dto: CreateFoodLogDto): Promise<FoodLog> {
    const foodItem = await this.findFoodById(dto.foodItemId);
    const servingCount = dto.servingCount ?? 1;
    const ratio = (servingCount * foodItem.servingSizeG) / foodItem.servingSizeG;

    const log = this.foodLogRepo.create({
      userId,
      foodItemId: dto.foodItemId,
      loggedAt: new Date(dto.loggedAt),
      mealType: dto.mealType,
      servingCount,
      servingSizeG: servingCount * foodItem.servingSizeG,
      caloriesConsumed: Math.round(foodItem.caloriesPerServing * ratio * 10) / 10,
      proteinConsumed: Math.round(foodItem.proteinG * ratio * 10) / 10,
      carbConsumed: Math.round(foodItem.carbG * ratio * 10) / 10,
      fatConsumed: Math.round(foodItem.fatG * ratio * 10) / 10,
      note: dto.note,
    });
    const saved = await this.foodLogRepo.save(log);
    await this.checkFoodAchievements(userId);
    return saved;
  }

  private async checkFoodAchievements(userId: string) {
    const totalLogs = await this.foodLogRepo.count({ where: { userId } });
    if (totalLogs === 1) {
      await this.achievementsService.unlock(userId, 'first_log');
    }

    // 7일 연속 기록 체크
    const streak = await this.calculateStreak(userId);
    if (streak >= 7) await this.achievementsService.unlock(userId, '7_day_streak');
    if (streak >= 30) await this.achievementsService.unlock(userId, '30_day_streak');
  }

  private async calculateStreak(userId: string): Promise<number> {
    const logs = await this.foodLogRepo
      .createQueryBuilder('log')
      .select('DATE(log.loggedAt)', 'date')
      .where('log.userId = :userId', { userId })
      .groupBy('DATE(log.loggedAt)')
      .orderBy('date', 'DESC')
      .limit(35)
      .getRawMany();

    if (!logs.length) return 0;
    let streak = 0;
    let expected = dayjs().startOf('day');
    for (const row of logs) {
      const d = dayjs(row.date).startOf('day');
      if (d.isSame(expected) || (streak === 0 && d.isSame(expected.subtract(1, 'day')))) {
        streak++;
        expected = d.subtract(1, 'day');
      } else {
        break;
      }
    }
    return streak;
  }

  async updateLog(userId: string, logId: string, dto: Partial<CreateFoodLogDto>): Promise<FoodLog> {
    const log = await this.foodLogRepo.findOne({ where: { id: logId, userId }, relations: ['foodItem'] });
    if (!log) throw new NotFoundException('식단 기록을 찾을 수 없습니다.');
    if (dto.servingCount) {
      const ratio = dto.servingCount;
      log.servingCount = dto.servingCount;
      log.servingSizeG = dto.servingCount * log.foodItem.servingSizeG;
      log.caloriesConsumed = Math.round(log.foodItem.caloriesPerServing * ratio * 10) / 10;
      log.proteinConsumed = Math.round(log.foodItem.proteinG * ratio * 10) / 10;
      log.carbConsumed = Math.round(log.foodItem.carbG * ratio * 10) / 10;
      log.fatConsumed = Math.round(log.foodItem.fatG * ratio * 10) / 10;
    }
    if (dto.mealType) log.mealType = dto.mealType;
    if (dto.note !== undefined) log.note = dto.note;
    return this.foodLogRepo.save(log);
  }

  async deleteLog(userId: string, logId: string): Promise<void> {
    const log = await this.foodLogRepo.findOne({ where: { id: logId, userId } });
    if (!log) throw new NotFoundException('식단 기록을 찾을 수 없습니다.');
    await this.foodLogRepo.remove(log);
  }
}
