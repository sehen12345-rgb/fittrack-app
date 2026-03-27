import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn, Index,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('body_metrics')
@Index(['userId', 'recordedAt'])
export class BodyMetrics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.bodyMetrics)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'date' })
  recordedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weightKg: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bodyFatPercent: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  muscleMassKg: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  waistCm: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  hipCm: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  chestCm: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  armCm: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  thighCm: number;

  @Column({ nullable: true, type: 'text' })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}
