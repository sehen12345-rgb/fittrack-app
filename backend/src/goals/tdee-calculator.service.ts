import { Injectable } from '@nestjs/common';
import { ActivityLevel, Gender, GoalType } from '../common/enums';
import { UserProfile } from '../users/user-profile.entity';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
  [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.EXTRA_ACTIVE]: 1.9,
};

// 목표별 기본 매크로 비율
const MACRO_RATIOS: Record<GoalType, { protein: number; carb: number; fat: number }> = {
  [GoalType.DIET]: { protein: 0.35, carb: 0.40, fat: 0.25 },
  [GoalType.BULK]: { protein: 0.30, carb: 0.50, fat: 0.20 },
  [GoalType.MAINTENANCE]: { protein: 0.25, carb: 0.50, fat: 0.25 },
};

export interface TdeeResult {
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
  proteinTargetG: number;
  carbTargetG: number;
  fatTargetG: number;
}

@Injectable()
export class TdeeCalculatorService {
  calculate(
    profile: UserProfile,
    weightKg: number,
    goalType: GoalType,
    weeklyRateKg: number = 0,
  ): TdeeResult {
    const age = this.getAge(profile.birthDate);
    const bmr = this.calcBmr(profile.gender, weightKg, profile.heightCm, age);
    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]);

    // 주간 목표 변화량 → 일일 칼로리 조정 (1kg = 7700 kcal)
    const dailyAdjustment = Math.round((weeklyRateKg * 7700) / 7);
    const dailyCalorieTarget = tdee + dailyAdjustment;

    const ratios = MACRO_RATIOS[goalType];
    return {
      bmr,
      tdee,
      dailyCalorieTarget,
      proteinTargetG: Math.round((dailyCalorieTarget * ratios.protein) / 4),
      carbTargetG: Math.round((dailyCalorieTarget * ratios.carb) / 4),
      fatTargetG: Math.round((dailyCalorieTarget * ratios.fat) / 9),
    };
  }

  private calcBmr(gender: Gender, weightKg: number, heightCm: number, age: number): number {
    // Mifflin-St Jeor 공식
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return Math.round(gender === Gender.MALE ? base + 5 : base - 161);
  }

  private getAge(birthDate: Date): number {
    if (!birthDate) return 30;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
}
