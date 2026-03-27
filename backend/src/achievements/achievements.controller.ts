import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AchievementsService } from './achievements.service';

@ApiTags('Achievements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: '내 업적 목록' })
  getMyAchievements(@CurrentUser('id') userId: string) {
    return this.achievementsService.getMyAchievements(userId);
  }

  @Get('available')
  @ApiOperation({ summary: '전체 업적 목록' })
  getAllAchievements() {
    return this.achievementsService.getAllAchievements();
  }
}
