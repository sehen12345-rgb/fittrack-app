import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ConfigService } from '@nestjs/config';
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
    private readonly config: ConfigService,
  ) {}

  async searchFoods(query: string, limit = 20): Promise<FoodItem[]> {
    const local = await this.foodItemRepo
      .createQueryBuilder('food')
      .where('food.name LIKE :q OR food.brand LIKE :q', { q: `%${query}%` })
      .orderBy('food.isVerified', 'DESC')
      .limit(limit)
      .getMany();

    if (local.length >= limit) return local;

    // 로컬 결과 부족 시 외부 API에서 보완
    const externals = await this.fetchExternalFoods(query, limit - local.length, new Set(local.map(f => f.name)));
    return [...local, ...externals];
  }

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
    ]);
  }

  private async fetchExternalFoods(query: string, needed: number, existingNames: Set<string>): Promise<FoodItem[]> {
    const results: FoodItem[] = [];

    // ① USDA FoodData Central (API 키 설정 시)
    const usdaKey = this.config.get<string>('USDA_API_KEY');
    if (usdaKey && results.length < needed) {
      try {
        const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${usdaKey}&pageSize=${needed}&dataType=Foundation,SR%20Legacy,Survey%20(FNDDS)`;
        const res = await this.withTimeout(fetch(url), 4000);
        if (res.ok) {
          const json: any = await res.json();
          const toSave: Partial<FoodItem>[] = [];
          for (const food of (json.foods || []).slice(0, needed)) {
            const name = food.description;
            if (!name || existingNames.has(name)) continue;
            const nuts: Record<number, number> = {};
            for (const n of (food.foodNutrients || [])) nuts[n.nutrientId] = n.value;
            toSave.push({
              name,
              servingSizeG: 100,
              caloriesPerServing: Math.round(nuts[1008] || 0),
              proteinG: parseFloat((nuts[1003] || 0).toFixed(1)),
              carbG: parseFloat((nuts[1005] || 0).toFixed(1)),
              fatG: parseFloat((nuts[1004] || 0).toFixed(1)),
              fiberG: parseFloat((nuts[1079] || 0).toFixed(1)),
              sodiumMg: Math.round((nuts[1093] || 0) * 1000),
              source: FoodSource.USDA,
              isVerified: true,
            });
            existingNames.add(name);
          }
          if (toSave.length > 0) {
            const saved = await this.foodItemRepo.save(toSave.map(d => this.foodItemRepo.create(d)));
            results.push(...saved);
          }
        }
      } catch { /* timeout or error — skip */ }
    }

    // ② Open Food Facts 검색 (fallback)
    if (results.length < needed) {
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&fields=product_name,product_name_ko,nutriments,brands,serving_size&page_size=${needed + 5}&lc=ko`;
        const res = await this.withTimeout(fetch(url), 4000);
        if (res.ok) {
          const json: any = await res.json();
          const toSave: Partial<FoodItem>[] = [];
          for (const p of (json.products || [])) {
            if (results.length + toSave.length >= needed) break;
            const name = p.product_name_ko || p.product_name;
            if (!name || existingNames.has(name)) continue;
            const n = p.nutriments || {};
            const serving = parseFloat(p.serving_size) || 100;
            const cal = Math.round(n['energy-kcal_serving'] || n['energy-kcal_100g'] * serving / 100 || 0);
            if (cal === 0) continue;
            toSave.push({
              name,
              brand: p.brands || null,
              servingSizeG: serving,
              caloriesPerServing: cal,
              proteinG: parseFloat((n['proteins_serving'] ?? n['proteins_100g'] * serving / 100 ?? 0).toFixed(1)),
              carbG: parseFloat((n['carbohydrates_serving'] ?? n['carbohydrates_100g'] * serving / 100 ?? 0).toFixed(1)),
              fatG: parseFloat((n['fat_serving'] ?? n['fat_100g'] * serving / 100 ?? 0).toFixed(1)),
              source: FoodSource.OPEN_FOOD_FACTS,
              isVerified: false,
            });
            existingNames.add(name);
          }
          if (toSave.length > 0) {
            const saved = await this.foodItemRepo.save(toSave.map(d => this.foodItemRepo.create(d)));
            results.push(...saved);
          }
        }
      } catch { /* timeout or error — skip */ }
    }

    return results;
  }

  async findByBarcode(barcode: string): Promise<FoodItem> {
    const local = await this.foodItemRepo.findOne({ where: { barcode } });
    if (local) return local;

    // Open Food Facts API 조회
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
      if (!res.ok) throw new Error('not found');
      const json: any = await res.json();
      if (json.status !== 1 || !json.product) throw new Error('not found');

      const p = json.product;
      const nutriments = p.nutriments || {};
      const servingSize = p.serving_size ? parseFloat(p.serving_size) || 100 : 100;

      const item = this.foodItemRepo.create({
        name: p.product_name || p.product_name_ko || barcode,
        brand: p.brands || null,
        barcode,
        servingSizeG: servingSize,
        caloriesPerServing: Math.round((nutriments['energy-kcal_serving'] || nutriments['energy-kcal_100g'] * servingSize / 100) || 0),
        proteinG: parseFloat((nutriments['proteins_serving'] || nutriments['proteins_100g'] * servingSize / 100 || 0).toFixed(1)),
        carbG: parseFloat((nutriments['carbohydrates_serving'] || nutriments['carbohydrates_100g'] * servingSize / 100 || 0).toFixed(1)),
        fatG: parseFloat((nutriments['fat_serving'] || nutriments['fat_100g'] * servingSize / 100 || 0).toFixed(1)),
        source: FoodSource.OPEN_FOOD_FACTS,
        isVerified: false,
      });
      return this.foodItemRepo.save(item);
    } catch {
      throw new NotFoundException('바코드에 해당하는 음식을 찾을 수 없습니다.');
    }
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

  async countLogDays(userId: string): Promise<number> {
    const result = await this.foodLogRepo
      .createQueryBuilder('log')
      .select('COUNT(DISTINCT DATE(log.loggedAt))', 'days')
      .where('log.userId = :userId', { userId })
      .getRawOne();
    return Number(result.days) || 0;
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

  async calculateStreak(userId: string): Promise<number> {
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
