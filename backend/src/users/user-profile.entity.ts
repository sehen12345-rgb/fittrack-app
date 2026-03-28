import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ActivityLevel, Gender } from '../common/enums';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', nullable: true })
  gender: Gender;

  @Column({ nullable: true, type: 'date' })
  birthDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  heightCm: number;

  @Column({ type: 'varchar', default: ActivityLevel.MODERATELY_ACTIVE })
  activityLevel: ActivityLevel;

  @UpdateDateColumn()
  updatedAt: Date;
}
