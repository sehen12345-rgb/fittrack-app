import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MetricsService, CreateMetricsDto } from './metrics.service';

@ApiTags('Body Metrics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('body-metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @ApiOperation({ summary: '신체 측정 기록 목록' })
  getAll(
    @CurrentUser('id') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.metricsService.getAll(userId, from, to);
  }

  @Get('latest')
  @ApiOperation({ summary: '최신 측정값 조회' })
  getLatest(@CurrentUser('id') userId: string) {
    return this.metricsService.getLatest(userId);
  }

  @Post()
  @ApiOperation({ summary: '신체 측정값 기록' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateMetricsDto) {
    return this.metricsService.create(userId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '기록 수정' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateMetricsDto>,
  ) {
    return this.metricsService.update(userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '기록 삭제' })
  delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.metricsService.delete(userId, id);
  }
}
