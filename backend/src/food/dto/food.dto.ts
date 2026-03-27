import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MealType } from '../../common/enums';

export class CreateFoodLogDto {
  @ApiProperty()
  @IsUUID()
  foodItemId: string;

  @ApiProperty({ example: '2025-01-15T08:30:00Z' })
  loggedAt: string;

  @ApiProperty({ enum: MealType })
  @IsEnum(MealType)
  mealType: MealType;

  @ApiPropertyOptional({ example: 1.5 })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  servingCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateFoodItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  servingSizeG: number;

  @ApiProperty({ example: 250 })
  @IsNumber()
  caloriesPerServing: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  proteinG: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  carbG: number;

  @ApiProperty({ example: 8 })
  @IsNumber()
  fatG: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fiberG?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sugarG?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sodiumMg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  barcode?: string;
}
