import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FoodItem } from './food-item.entity';
import { FoodLog } from './food-log.entity';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoodItem, FoodLog]), AchievementsModule, ConfigModule],
  providers: [FoodService],
  controllers: [FoodController],
  exports: [FoodService],
})
export class FoodModule {}
