import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn, Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { WorkoutTemplate } from './workout-template.entity';

@Entity('workout_logs')
@Index(['userId', 'workoutDate'])
export class WorkoutLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workoutLogs)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'date' })
  workoutDate: Date;

  @Column({ type: 'datetime', nullable: true })
  startTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: true })
  totalDurationMin: number;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0 })
  totalCaloriesBurned: number;

  @Column({ nullable: true, type: 'text' })
  note: string;

  @OneToMany(() => WorkoutSet, (set) => set.workoutLog, { cascade: true })
  sets: WorkoutSet[];

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('workout_sets')
export class WorkoutSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkoutLog, (log) => log.sets, { onDelete: 'CASCADE' })
  @JoinColumn()
  workoutLog: WorkoutLog;

  @Column()
  workoutLogId: string;

  @ManyToOne(() => WorkoutTemplate)
  @JoinColumn()
  workoutTemplate: WorkoutTemplate;

  @Column()
  workoutTemplateId: string;

  @Column({ type: 'int' })
  setNumber: number;

  @Column({ type: 'int', nullable: true })
  reps: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  weightKg: number;

  @Column({ type: 'int', nullable: true })
  durationSec: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  distanceKm: number;

  @Column({ type: 'int', nullable: true })
  rpe: number;
}
