import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { NotificationsService } from './notifications.service';
import { User } from '../users/user.entity';
import { FoodLog } from '../food/food-log.entity';
import { WorkoutLog } from '../workout/workout-log.entity';
import { Goal } from '../goals/goal.entity';
import { NotificationType, MealType } from '../common/enums';
import * as dayjs from 'dayjs';

@Injectable()
export class NotificationSchedulerService {
  private readonly logger = new Logger(NotificationSchedulerService.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(FoodLog)
    private readonly foodLogRepo: Repository<FoodLog>,
    @InjectRepository(WorkoutLog)
    private readonly workoutLogRepo: Repository<WorkoutLog>,
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
  ) {}

  /** 아침 식사 알림 — 매일 오전 8시 */
  @Cron('0 8 * * *')
  async sendBreakfastReminder() {
    this.logger.log('아침 식사 알림 발송 시작');
    const users = await this.getActiveUsers();
    const today = dayjs().format('YYYY-MM-DD');
    const start = dayjs(today).startOf('day').toDate();
    const end = dayjs(today).endOf('day').toDate();

    for (const user of users) {
      const hasBreakfast = await this.foodLogRepo.findOne({
        where: { userId: user.id, mealType: MealType.BREAKFAST, loggedAt: Between(start, end) },
      });
      if (!hasBreakfast) {
        await this.notificationsService.create(
          user.id,
          NotificationType.MEAL_REMINDER,
          '아침 식사 기록 알림',
          '오늘 아침 식사를 아직 기록하지 않으셨어요. 건강한 하루를 위해 식사를 기록해보세요!',
        );
      }
    }
  }

  /** 점심 식사 알림 — 매일 오후 12시 30분 */
  @Cron('30 12 * * *')
  async sendLunchReminder() {
    this.logger.log('점심 식사 알림 발송 시작');
    const users = await this.getActiveUsers();
    const today = dayjs().format('YYYY-MM-DD');
    const start = dayjs(today).startOf('day').toDate();
    const end = dayjs(today).endOf('day').toDate();

    for (const user of users) {
      const hasLunch = await this.foodLogRepo.findOne({
        where: { userId: user.id, mealType: MealType.LUNCH, loggedAt: Between(start, end) },
      });
      if (!hasLunch) {
        await this.notificationsService.create(
          user.id,
          NotificationType.MEAL_REMINDER,
          '점심 식사 기록 알림',
          '점심 식사는 하셨나요? 식단 기록을 통해 칼로리 목표를 달성해보세요!',
        );
      }
    }
  }

  /** 저녁 식사 알림 — 매일 오후 7시 */
  @Cron('0 19 * * *')
  async sendDinnerReminder() {
    this.logger.log('저녁 식사 알림 발송 시작');
    const users = await this.getActiveUsers();
    const today = dayjs().format('YYYY-MM-DD');
    const start = dayjs(today).startOf('day').toDate();
    const end = dayjs(today).endOf('day').toDate();

    for (const user of users) {
      const hasDinner = await this.foodLogRepo.findOne({
        where: { userId: user.id, mealType: MealType.DINNER, loggedAt: Between(start, end) },
      });
      if (!hasDinner) {
        await this.notificationsService.create(
          user.id,
          NotificationType.MEAL_REMINDER,
          '저녁 식사 기록 알림',
          '저녁 식사를 아직 기록하지 않으셨어요. 오늘 하루 식단을 마무리해보세요!',
        );
      }
    }
  }

  /** 운동 알림 — 매일 오후 6시 (운동 기록 없는 유저) */
  @Cron('0 18 * * *')
  async sendWorkoutReminder() {
    this.logger.log('운동 알림 발송 시작');
    const users = await this.getActiveUsers();
    const today = dayjs().format('YYYY-MM-DD');

    for (const user of users) {
      const todayWorkout = await this.workoutLogRepo.findOne({
        where: { userId: user.id, workoutDate: new Date(today) as any },
      });
      if (!todayWorkout) {
        await this.notificationsService.create(
          user.id,
          NotificationType.WORKOUT_REMINDER,
          '오늘 운동 어떠세요?',
          '오늘 운동 기록이 없어요. 가벼운 운동이라도 기록해보는 건 어떨까요?',
        );
      }
    }
  }

  /** 목표 진행 알림 — 매일 오후 9시 */
  @Cron('0 21 * * *')
  async sendGoalProgressReminder() {
    this.logger.log('목표 진행 알림 발송 시작');
    const users = await this.getActiveUsers();
    const today = dayjs().format('YYYY-MM-DD');
    const start = dayjs(today).startOf('day').toDate();
    const end = dayjs(today).endOf('day').toDate();

    for (const user of users) {
      const goal = await this.goalRepo.findOne({ where: { userId: user.id, isActive: true } });
      if (!goal) continue;

      const result = await this.foodLogRepo
        .createQueryBuilder('log')
        .select('SUM(log.caloriesConsumed)', 'total')
        .where('log.userId = :userId AND log.loggedAt BETWEEN :start AND :end', {
          userId: user.id, start, end,
        })
        .getRawOne();

      const consumed = Number(result?.total) || 0;
      const target = goal.dailyCalorieTarget;
      const ratio = consumed / target;

      let title = '오늘의 목표 진행 현황';
      let message = '';

      if (ratio < 0.5) {
        message = `오늘 ${consumed}kcal 섭취했어요. 목표(${target}kcal)의 ${Math.round(ratio * 100)}%입니다. 더 챙겨 드세요!`;
      } else if (ratio >= 0.9 && ratio <= 1.1) {
        message = `훌륭해요! 오늘 ${consumed}kcal로 목표 대비 ${Math.round(ratio * 100)}%를 달성했어요.`;
      } else if (ratio > 1.2) {
        message = `오늘 ${consumed}kcal 섭취해 목표(${target}kcal)를 초과했어요. 내일 조절해보세요.`;
      } else {
        message = `오늘 ${consumed}kcal 섭취했어요. 목표까지 ${target - consumed}kcal 남았어요!`;
      }

      await this.notificationsService.create(user.id, NotificationType.GOAL_PROGRESS, title, message);
    }
  }

  /** 주간 리포트 — 매주 일요일 오후 8시 */
  @Cron('0 20 * * 0')
  async sendWeeklyReport() {
    this.logger.log('주간 리포트 발송 시작');
    const users = await this.getActiveUsers();
    const weekStart = dayjs().subtract(6, 'day').startOf('day').toDate();
    const weekEnd = dayjs().endOf('day').toDate();

    for (const user of users) {
      const result = await this.foodLogRepo
        .createQueryBuilder('log')
        .select('SUM(log.caloriesConsumed)', 'totalCalories')
        .addSelect('COUNT(DISTINCT DATE(log.loggedAt))', 'loggedDays')
        .where('log.userId = :userId AND log.loggedAt BETWEEN :weekStart AND :weekEnd', {
          userId: user.id, weekStart, weekEnd,
        })
        .getRawOne();

      const totalCalories = Math.round(Number(result?.totalCalories) || 0);
      const loggedDays = Number(result?.loggedDays) || 0;
      const weekStartDate = dayjs().subtract(6, 'day').startOf('day').toDate();
      const weekEndDate = dayjs().endOf('day').toDate();
      const workouts = await this.workoutLogRepo
        .createQueryBuilder('wl')
        .where('wl.userId = :userId AND wl.createdAt BETWEEN :weekStartDate AND :weekEndDate', {
          userId: user.id, weekStartDate, weekEndDate,
        })
        .getCount();
      const workoutCount = workouts;

      await this.notificationsService.create(
        user.id,
        NotificationType.WEEKLY_REPORT,
        '이번 주 리포트',
        `이번 주 ${loggedDays}일 식단 기록, 총 ${totalCalories.toLocaleString()}kcal 섭취, 운동 ${workoutCount}회 완료! 꾸준한 노력이 빛나고 있어요.`,
      );
    }
  }

  private async getActiveUsers(): Promise<User[]> {
    return this.userRepo.find({ where: { isDeleted: false } });
  }
}
