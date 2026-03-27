import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutLog, WorkoutSet } from './workout-log.entity';
import { WorkoutTemplate } from './workout-template.entity';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutLog, WorkoutSet, WorkoutTemplate]), AchievementsModule],
  providers: [WorkoutService],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
