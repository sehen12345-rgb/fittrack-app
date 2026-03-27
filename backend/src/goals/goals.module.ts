import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TdeeCalculatorService } from './tdee-calculator.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Goal]), UsersModule],
  providers: [GoalsService, TdeeCalculatorService],
  controllers: [GoalsController],
  exports: [GoalsService, TdeeCalculatorService],
})
export class GoalsModule {}
