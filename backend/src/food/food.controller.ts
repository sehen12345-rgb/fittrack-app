import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { FoodService } from './food.service';
import { CreateFoodLogDto, CreateFoodItemDto } from './dto/food.dto';

@ApiTags('Food')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // --- 음식 DB ---
  @Get('foods/search')
  @ApiOperation({ summary: '음식 검색' })
  @ApiQuery({ name: 'q', type: String })
  searchFoods(@Query('q') q: string) {
    return this.foodService.searchFoods(q);
  }

  @Get('foods/barcode/:barcode')
  @ApiOperation({ summary: '바코드 조회' })
  findByBarcode(@Param('barcode') barcode: string) {
    return this.foodService.findByBarcode(barcode);
  }

  @Get('foods/frequent')
  @ApiOperation({ summary: '자주 먹는 음식' })
  getFrequent(@CurrentUser('id') userId: string) {
    return this.foodService.getFrequentFoods(userId);
  }

  @Get('foods/recent')
  @ApiOperation({ summary: '최근 먹은 음식' })
  getRecent(@CurrentUser('id') userId: string) {
    return this.foodService.getRecentFoods(userId);
  }

  @Get('foods/:id')
  @ApiOperation({ summary: '음식 상세' })
  findFood(@Param('id') id: string) {
    return this.foodService.findFoodById(id);
  }

  @Post('foods')
  @ApiOperation({ summary: '음식 직접 등록' })
  createFood(@CurrentUser('id') userId: string, @Body() dto: CreateFoodItemDto) {
    return this.foodService.createFoodItem(userId, dto);
  }

  // --- 식단 로그 ---
  @Get('food-logs')
  @ApiOperation({ summary: '날짜별 식단 로그' })
  @ApiQuery({ name: 'date', example: '2025-01-15' })
  getLogs(@CurrentUser('id') userId: string, @Query('date') date: string) {
    return this.foodService.getLogs(userId, date || new Date().toISOString().slice(0, 10));
  }

  @Get('food-logs/summary')
  @ApiOperation({ summary: '일일 매크로 합산 요약' })
  @ApiQuery({ name: 'date', example: '2025-01-15' })
  getSummary(@CurrentUser('id') userId: string, @Query('date') date: string) {
    return this.foodService.getDailySummary(userId, date || new Date().toISOString().slice(0, 10));
  }

  @Post('food-logs')
  @ApiOperation({ summary: '식단 로그 추가' })
  createLog(@CurrentUser('id') userId: string, @Body() dto: CreateFoodLogDto) {
    return this.foodService.createLog(userId, dto);
  }

  @Put('food-logs/:id')
  @ApiOperation({ summary: '식단 로그 수정' })
  updateLog(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateFoodLogDto>,
  ) {
    return this.foodService.updateLog(userId, id, dto);
  }

  @Delete('food-logs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '식단 로그 삭제' })
  deleteLog(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.foodService.deleteLog(userId, id);
  }
}
