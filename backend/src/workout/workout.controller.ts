import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { WorkoutService } from './workout.service';
import { CreateWorkoutLogDto, WorkoutSetDto } from './dto/workout.dto';

@ApiTags('Workout')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('workouts/templates')
  @ApiOperation({ summary: '운동 템플릿 검색' })
  getTemplates(@Query('q') q?: string) {
    return this.workoutService.getTemplates(q);
  }

  @Post('workouts/templates/sync')
  @ApiOperation({ summary: 'wger API에서 운동 데이터 동기화 (관리자)' })
  syncTemplates() {
    return this.workoutService.syncFromWger();
  }

  @Get('workouts/templates/:id/history')
  @ApiOperation({ summary: '특정 운동 이전 기록' })
  getHistory(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.workoutService.getTemplateHistory(userId, id);
  }

  @Get('workout-logs')
  @ApiOperation({ summary: '날짜별 운동 로그' })
  @ApiQuery({ name: 'date', example: '2025-01-15' })
  getLogs(@CurrentUser('id') userId: string, @Query('date') date: string) {
    return this.workoutService.getLogs(userId, date || new Date().toISOString().slice(0, 10));
  }

  @Post('workout-logs')
  @ApiOperation({ summary: '운동 세션 기록 생성' })
  createLog(@CurrentUser('id') userId: string, @Body() dto: CreateWorkoutLogDto) {
    return this.workoutService.createLog(userId, dto);
  }

  @Post('workout-logs/:id/sets')
  @ApiOperation({ summary: '세트 추가' })
  addSets(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: { sets: WorkoutSetDto[] },
  ) {
    return this.workoutService.addSets(userId, id, dto.sets);
  }

  @Put('workout-logs/:id')
  @ApiOperation({ summary: '운동 기록 수정' })
  updateLog(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateWorkoutLogDto>,
  ) {
    return this.workoutService.updateLog(userId, id, dto);
  }

  @Delete('workout-logs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '운동 기록 삭제' })
  deleteLog(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.workoutService.deleteLog(userId, id);
  }
}
