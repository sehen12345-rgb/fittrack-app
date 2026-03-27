import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { FoodModule } from '../food/food.module';
import { WorkoutModule } from '../workout/workout.module';
import { MetricsModule } from '../metrics/metrics.module';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [FoodModule, WorkoutModule, MetricsModule, GoalsModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
