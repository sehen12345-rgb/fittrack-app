import { Injectable } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { WorkoutService } from '../workout/workout.service';
import { MetricsService } from '../metrics/metrics.service';
import { GoalsService } from '../goals/goals.service';
import * as dayjs from 'dayjs';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly foodService: FoodService,
    private readonly workoutService: WorkoutService,
    private readonly metricsService: MetricsService,
    private readonly goalsService: GoalsService,
  ) {}

  async getDashboard(userId: string) {
    const today = dayjs().format('YYYY-MM-DD');
    const [foodSummary, workoutLogs, latestMetrics, activeGoal, foodLogDays, workoutLogDays] = await Promise.all([
      this.foodService.getDailySummary(userId, today),
      this.workoutService.getLogs(userId, today),
      this.metricsService.getLatest(userId),
      this.goalsService.getActiveGoal(userId).catch(() => null),
      this.foodService.countLogDays(userId),
      this.workoutService.countLogDays(userId),
    ]);

    const caloriesBurned = workoutLogs.reduce((sum, log) => sum + Number(log.totalCaloriesBurned), 0);
    const netCalories = foodSummary.totalCalories - caloriesBurned;

    const petExp = foodLogDays + workoutLogDays * 2;
    const petStage =
      petExp >= 100 ? 5 :
      petExp >= 50  ? 4 :
      petExp >= 20  ? 3 :
      petExp >= 7   ? 2 :
      petExp >= 1   ? 1 : 0;
    const expThresholds = [0, 1, 7, 20, 50, 100];
    const nextThreshold = petStage < 5 ? expThresholds[petStage + 1] : null;
    const prevThreshold = expThresholds[petStage];

    return {
      date: today,
      food: foodSummary,
      workout: {
        sessionCount: workoutLogs.length,
        totalCaloriesBurned: caloriesBurned,
      },
      latestWeight: latestMetrics?.weightKg ?? null,
      netCalories,
      goal: activeGoal
        ? {
            type: activeGoal.goalType,
            calorieTarget: activeGoal.dailyCalorieTarget,
            proteinTarget: activeGoal.proteinTargetG,
            carbTarget: activeGoal.carbTargetG,
            fatTarget: activeGoal.fatTargetG,
            calorieProgress: Math.min(100, Math.round((foodSummary.totalCalories / activeGoal.dailyCalorieTarget) * 100)),
            proteinProgress: Math.min(100, Math.round((foodSummary.totalProtein / activeGoal.proteinTargetG) * 100)),
          }
        : null,
      pet: {
        exp: petExp,
        stage: petStage,
        foodLogDays,
        workoutLogDays,
        todayFoodDone: foodSummary.totalCalories > 0,
        todayWorkoutDone: workoutLogs.length > 0,
        nextThreshold,
        expProgress: nextThreshold
          ? Math.round(((petExp - prevThreshold) / (nextThreshold - prevThreshold)) * 100)
          : 100,
      },
    };
  }

  async getCharacter(userId: string) {
    const today = dayjs();

    // 최근 7일 활동 조회
    const recentActivity = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const date = today.subtract(6 - i, 'day').format('YYYY-MM-DD');
        return Promise.all([
          this.foodService.getDailySummary(userId, date),
          this.workoutService.getLogs(userId, date),
        ]).then(([food, workout]) => ({
          date,
          foodDone: food.totalCalories > 0,
          workoutDone: workout.length > 0,
        }));
      }),
    );

    const [foodLogDays, workoutLogDays, currentStreak] = await Promise.all([
      this.foodService.countLogDays(userId),
      this.workoutService.countLogDays(userId),
      this.foodService.calculateStreak(userId),
    ]);

    const todayActivity = recentActivity[6];

    let mood: 'happy' | 'content' | 'tired' | 'sad';
    if (todayActivity.foodDone && todayActivity.workoutDone) {
      mood = 'happy';
    } else if (todayActivity.foodDone || todayActivity.workoutDone) {
      mood = 'content';
    } else if (recentActivity[5].foodDone || recentActivity[5].workoutDone) {
      mood = 'tired';
    } else {
      mood = 'sad';
    }

    const petExp = foodLogDays + workoutLogDays * 2;
    const petStage =
      petExp >= 100 ? 5 :
      petExp >= 50  ? 4 :
      petExp >= 20  ? 3 :
      petExp >= 7   ? 2 :
      petExp >= 1   ? 1 : 0;
    const expThresholds = [0, 1, 7, 20, 50, 100];
    const nextThreshold = petStage < 5 ? expThresholds[petStage + 1] : null;
    const prevThreshold = expThresholds[petStage];

    return {
      exp: petExp,
      stage: petStage,
      foodLogDays,
      workoutLogDays,
      todayFoodDone: todayActivity.foodDone,
      todayWorkoutDone: todayActivity.workoutDone,
      nextThreshold,
      expProgress: nextThreshold
        ? Math.round(((petExp - prevThreshold) / (nextThreshold - prevThreshold)) * 100)
        : 100,
      mood,
      recentActivity,
      currentStreak,
    };
  }

  async getWeightTrend(userId: string, days = 30) {
    const from = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
    const to = dayjs().format('YYYY-MM-DD');
    const metrics = await this.metricsService.getAll(userId, from, to);
    return metrics.map((m) => ({
      date: dayjs(m.recordedAt).format('YYYY-MM-DD'),
      weight: m.weightKg,
      bodyFat: m.bodyFatPercent,
      muscleMass: m.muscleMassKg,
    }));
  }

  async getCalorieTrend(userId: string, days = 14) {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      const summary = await this.foodService.getDailySummary(userId, date);
      result.push({ date, ...summary });
    }
    return result;
  }

  async getMacroBreakdown(userId: string, from: string, to: string) {
    const days = dayjs(to).diff(dayjs(from), 'day') + 1;
    let totals = { calories: 0, protein: 0, carb: 0, fat: 0 };

    for (let i = 0; i < days; i++) {
      const date = dayjs(from).add(i, 'day').format('YYYY-MM-DD');
      const s = await this.foodService.getDailySummary(userId, date);
      totals.calories += s.totalCalories;
      totals.protein += s.totalProtein;
      totals.carb += s.totalCarb;
      totals.fat += s.totalFat;
    }

    return {
      period: { from, to, days },
      totals,
      dailyAverage: {
        calories: Math.round(totals.calories / days),
        protein: Math.round(totals.protein / days),
        carb: Math.round(totals.carb / days),
        fat: Math.round(totals.fat / days),
      },
    };
  }

  async getGoalProgress(userId: string) {
    const goal = await this.goalsService.getActiveGoal(userId).catch(() => null);
    if (!goal) return null;

    const latest = await this.metricsService.getLatest(userId);
    if (!latest) return { goal, progress: null };

    const startWeight = Number(goal.startWeightKg);
    const currentWeight = Number(latest.weightKg);
    const targetWeight = goal.targetWeightKg ? Number(goal.targetWeightKg) : null;

    let progressPercent = 0;
    if (targetWeight) {
      const totalChange = targetWeight - startWeight;
      const currentChange = currentWeight - startWeight;
      progressPercent = totalChange !== 0 ? Math.round((currentChange / totalChange) * 100) : 0;
    }

    const daysElapsed = dayjs().diff(dayjs(goal.startDate), 'day');
    const daysLeft = goal.targetDate
      ? dayjs(goal.targetDate).diff(dayjs(), 'day')
      : null;

    return {
      goal,
      currentWeight,
      weightChange: Math.round((currentWeight - startWeight) * 10) / 10,
      progressPercent: Math.max(0, progressPercent),
      daysElapsed,
      daysLeft,
    };
  }

  async getWorkoutVolume(userId: string, from: string, to: string) {
    return this.workoutService.getVolumeByMuscle(userId, from, to);
  }

  async getWeeklyReport(userId: string) {
    const from = dayjs().subtract(6, 'day').format('YYYY-MM-DD');
    const to = dayjs().format('YYYY-MM-DD');
    const [calorieData, weightTrend, progress] = await Promise.all([
      this.getMacroBreakdown(userId, from, to),
      this.getWeightTrend(userId, 7),
      this.getGoalProgress(userId),
    ]);
    return { week: { from, to }, calories: calorieData, weight: weightTrend, progress };
  }
}
