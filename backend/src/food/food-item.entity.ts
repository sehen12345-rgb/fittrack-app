import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index,
} from 'typeorm';
import { FoodSource } from '../common/enums';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  servingSizeG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  caloriesPerServing: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  proteinG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  carbG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  fatG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  fiberG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  sugarG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  sodiumMg: number;

  @Column({ type: 'varchar' })
  source: FoodSource;

  @Column({ nullable: true })
  @Index()
  barcode: string;

  @Column({ nullable: true })
  createdByUserId: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
