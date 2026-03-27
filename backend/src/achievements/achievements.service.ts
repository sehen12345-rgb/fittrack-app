import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement, UserAchievement } from './achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepo: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepo: Repository<UserAchievement>,
  ) {}

  async getMyAchievements(userId: string) {
    return this.userAchievementRepo
      .createQueryBuilder('ua')
      .leftJoinAndSelect('ua.achievement', 'a')
      .where('ua.userId = :userId', { userId })
      .orderBy('ua.unlockedAt', 'DESC')
      .getMany();
  }

  async getAllAchievements() {
    return this.achievementRepo.find();
  }

  async unlock(userId: string, achievementKey: string) {
    const achievement = await this.achievementRepo.findOne({ where: { key: achievementKey } });
    if (!achievement) return;

    const existing = await this.userAchievementRepo.findOne({
      where: { userId, achievementId: achievement.id },
    });
    if (existing) return;

    const ua = this.userAchievementRepo.create({ userId, achievementId: achievement.id });
    return this.userAchievementRepo.save(ua);
  }
}
