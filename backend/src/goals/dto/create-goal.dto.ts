import {
  IsEnum, IsNumber, IsOptional, IsDateString, Min, Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType } from '../../common/enums';

export class CreateGoalDto {
  @ApiProperty({ enum: GoalType })
  @IsEnum(GoalType)
  goalType: GoalType;

  @ApiProperty({ example: 75.5 })
  @IsNumber()
  @Min(20)
  @Max(300)
  startWeightKg: number;

  @ApiPropertyOptional({ example: 65.0 })
  @IsOptional()
  @IsNumber()
  targetWeightKg?: number;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @ApiPropertyOptional({ example: -0.5, description: '주간 목표 변화량 (kg). 감량은 음수, 증량은 양수' })
  @IsOptional()
  @IsNumber()
  @Min(-1.5)
  @Max(1.5)
  weeklyRateKg?: number;
}
