import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodItem } from './food-item.entity';
import { FoodLog } from './food-log.entity';
import { AchievementsService } from '../achievements/achievements.service';
import { FoodSource, MealType } from '../common/enums';

const mockFoodItemRepo = {
  createQueryBuilder: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockFoodLogRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  createQueryBuilder: jest.fn(),
};

const mockAchievementsService = {
  unlock: jest.fn(),
};

// Open Food Facts fetch mock
global.fetch = jest.fn();

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        { provide: getRepositoryToken(FoodItem), useValue: mockFoodItemRepo },
        { provide: getRepositoryToken(FoodLog), useValue: mockFoodLogRepo },
        { provide: AchievementsService, useValue: mockAchievementsService },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    jest.clearAllMocks();
  });

  describe('searchFoods', () => {
    it('검색어로 음식 조회', async () => {
      const mockQb = {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: '1', name: '닭가슴살' }]),
      };
      mockFoodItemRepo.createQueryBuilder.mockReturnValue(mockQb);

      const result = await service.searchFoods('닭가슴살');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('닭가슴살');
    });
  });

  describe('findByBarcode', () => {
    it('로컬 DB에서 바코드 음식 반환', async () => {
      const foodItem = { id: '1', name: '바나나', barcode: '123456' };
      mockFoodItemRepo.findOne.mockResolvedValue(foodItem);

      const result = await service.findByBarcode('123456');
      expect(result).toEqual(foodItem);
    });

    it('로컬 DB에 없으면 Open Food Facts 조회', async () => {
      mockFoodItemRepo.findOne.mockResolvedValue(null);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 1,
          product: {
            product_name: '테스트 식품',
            brands: '테스트 브랜드',
            serving_size: '100',
            nutriments: {
              'energy-kcal_serving': 200,
              proteins_serving: 10,
              carbohydrates_serving: 25,
              fat_serving: 5,
            },
          },
        }),
      });
      mockFoodItemRepo.create.mockImplementation((data) => data);
      mockFoodItemRepo.save.mockImplementation((data) => ({ id: 'new-id', ...data }));

      const result = await service.findByBarcode('9999');
      expect(result.name).toBe('테스트 식품');
      expect(result.source).toBe(FoodSource.OPEN_FOOD_FACTS);
    });

    it('Open Food Facts에도 없으면 NotFoundException', async () => {
      mockFoodItemRepo.findOne.mockResolvedValue(null);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ status: 0 }),
      });

      await expect(service.findByBarcode('000')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteLog', () => {
    it('존재하지 않는 로그 삭제 시 NotFoundException', async () => {
      mockFoodLogRepo.findOne.mockResolvedValue(null);
      await expect(service.deleteLog('u1', 'log-999')).rejects.toThrow(NotFoundException);
    });

    it('정상 로그 삭제', async () => {
      const log = { id: 'log1', userId: 'u1' };
      mockFoodLogRepo.findOne.mockResolvedValue(log);
      mockFoodLogRepo.remove.mockResolvedValue(undefined);

      await service.deleteLog('u1', 'log1');
      expect(mockFoodLogRepo.remove).toHaveBeenCalledWith(log);
    });
  });
});
