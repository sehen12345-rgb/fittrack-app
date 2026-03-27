import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class WorkoutSetDto {
  @ApiProperty()
  @IsUUID()
  workoutTemplateId: string;

  @ApiProperty()
  @IsNumber()
  setNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  reps?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  durationSec?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  distanceKm?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  rpe?: number;
}

export class CreateWorkoutLogDto {
  @ApiProperty({ example: '2025-01-15' })
  @IsDateString()
  workoutDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({ type: [WorkoutSetDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSetDto)
  sets?: WorkoutSetDto[];
}
