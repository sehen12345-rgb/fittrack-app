import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodItem } from './food-item.entity';
import { FoodLog } from './food-log.entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoodItem, FoodLog]), AchievementsModule],
  providers: [FoodService],
  controllers: [FoodController],
  exports: [FoodService],
})
export class FoodModule {}
