import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn, Index,
} from 'typeorm';
import { MealType } from '../common/enums';
import { User } from '../users/user.entity';
import { FoodItem } from './food-item.entity';

@Entity('food_logs')
@Index(['userId', 'loggedAt'])
export class FoodLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.foodLogs)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => FoodItem)
  @JoinColumn()
  foodItem: FoodItem;

  @Column()
  foodItemId: string;

  @Column({ type: 'datetime' })
  loggedAt: Date;

  @Column({ type: 'varchar' })
  mealType: MealType;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 })
  servingCount: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  servingSizeG: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  caloriesConsumed: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  proteinConsumed: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  carbConsumed: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  fatConsumed: number;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}
