import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@ApiTags('Goals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get('active')
  @ApiOperation({ summary: '현재 활성 목표 조회' })
  getActive(@CurrentUser('id') userId: string) {
    return this.goalsService.getActiveGoal(userId);
  }

  @Get('tdee')
  @ApiOperation({ summary: 'TDEE 추천 칼로리 조회' })
  @ApiQuery({ name: 'weight', type: Number })
  getTdee(
    @CurrentUser('id') userId: string,
    @Query('weight') weight: number,
  ) {
    return this.goalsService.getTdeeRecommendation(userId, weight);
  }

  @Get()
  @ApiOperation({ summary: '전체 목표 목록' })
  getAll(@CurrentUser('id') userId: string) {
    return this.goalsService.getAll(userId);
  }

  @Post()
  @ApiOperation({ summary: '목표 생성' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateGoalDto) {
    return this.goalsService.create(userId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '목표 수정' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateGoalDto>,
  ) {
    return this.goalsService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '목표 비활성화' })
  deactivate(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.goalsService.deactivate(userId, id);
  }
}
