import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: '오늘의 종합 대시보드' })
  getDashboard(@CurrentUser('id') userId: string) {
    return this.analyticsService.getDashboard(userId);
  }

  @Get('weight-trend')
  @ApiOperation({ summary: '체중 변화 추이' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  getWeightTrend(@CurrentUser('id') userId: string, @Query('days') days?: number) {
    return this.analyticsService.getWeightTrend(userId, days ?? 30);
  }

  @Get('calorie-trend')
  @ApiOperation({ summary: '칼로리 섭취 추이' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  getCalorieTrend(@CurrentUser('id') userId: string, @Query('days') days?: number) {
    return this.analyticsService.getCalorieTrend(userId, days ?? 14);
  }

  @Get('macro-breakdown')
  @ApiOperation({ summary: '기간별 매크로 분석' })
  getMacroBreakdown(
    @CurrentUser('id') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.analyticsService.getMacroBreakdown(userId, from, to);
  }

  @Get('goal-progress')
  @ApiOperation({ summary: '목표 달성 진행률' })
  getGoalProgress(@CurrentUser('id') userId: string) {
    return this.analyticsService.getGoalProgress(userId);
  }

  @Get('workout-volume')
  @ApiOperation({ summary: '근육 부위별 운동 볼륨' })
  getWorkoutVolume(
    @CurrentUser('id') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.analyticsService.getWorkoutVolume(userId, from, to);
  }

  @Get('weekly-report')
  @ApiOperation({ summary: '주간 리포트' })
  getWeeklyReport(@CurrentUser('id') userId: string) {
    return this.analyticsService.getWeeklyReport(userId);
  }
}
