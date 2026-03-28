import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ type: 'simple-json', nullable: true })
  condition: object;
}

@Entity('user_achievements')
export class UserAchievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  achievementId: string;

  @ManyToOne(() => Achievement, { eager: false })
  @JoinColumn({ name: 'achievementId' })
  achievement: Achievement;

  @CreateDateColumn()
  unlockedAt: Date;
}
