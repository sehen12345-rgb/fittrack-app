import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';
import { WorkoutCategory } from '../common/enums';

@Entity('workout_templates')
export class WorkoutTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  category: WorkoutCategory;

  @Column('simple-array', { nullable: true })
  targetMuscleGroups: string[];

  @Column('simple-array', { nullable: true })
  equipmentRequired: string[];

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  caloriesBurnedPerMinute: number;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: true })
  isSystem: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
