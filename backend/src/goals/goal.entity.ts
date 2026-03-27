import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GoalType } from '../common/enums';
import { User } from '../users/user.entity';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'varchar' })
  goalType: GoalType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  targetDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  startWeightKg: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  targetWeightKg: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0 })
  weeklyRateKg: number;

  @Column({ type: 'int' })
  dailyCalorieTarget: number;

  @Column({ type: 'int' })
  proteinTargetG: number;

  @Column({ type: 'int' })
  carbTargetG: number;

  @Column({ type: 'int' })
  fatTargetG: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
