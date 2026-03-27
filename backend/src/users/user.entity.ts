import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AuthProvider } from '../common/enums';
import { Goal } from '../goals/goal.entity';
import { FoodLog } from '../food/food-log.entity';
import { WorkoutLog } from '../workout/workout-log.entity';
import { BodyMetrics } from '../metrics/body-metrics.entity';
import { UserProfile } from './user-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  passwordHash: string;

  @Column({ type: 'varchar' })
  provider: AuthProvider;

  @Column({ nullable: true })
  providerId: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => FoodLog, (log) => log.user)
  foodLogs: FoodLog[];

  @OneToMany(() => WorkoutLog, (log) => log.user)
  workoutLogs: WorkoutLog[];

  @OneToMany(() => BodyMetrics, (metrics) => metrics.user)
  bodyMetrics: BodyMetrics[];
}
