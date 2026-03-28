import { DataSource } from 'typeorm';
import { FoodItem } from '../food/food-item.entity';
import { WorkoutTemplate } from '../workout/workout-template.entity';
import { Achievement } from '../achievements/achievement.entity';
import { WorkoutCategory } from '../common/enums';
import { FOOD_DATA } from './food-data';

const foods: Partial<FoodItem>[] = FOOD_DATA;

const workouts: Partial<WorkoutTemplate>[] = [
  { name: '벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps', 'shoulders'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'hamstrings'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '데드리프트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'glutes', 'hamstrings'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '풀업 / 턱걸이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['pullup_bar'], isSystem: true },
  { name: '숄더프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'triceps'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '바벨로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '랫풀다운', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '레그프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['leg_press'], isSystem: true },
  { name: '런지', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'hamstrings'], equipmentRequired: [], isSystem: true },
  { name: '바이셉컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '트라이셉스 익스텐션', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['dumbbell', 'cable'], isSystem: true },
  { name: '플랭크', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'abs'], equipmentRequired: [], isSystem: true },
  { name: '크런치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs'], equipmentRequired: [], isSystem: true },
  { name: '러닝 (실내)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['treadmill'], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '사이클 (실내)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['bike'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '줄넘기', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['rope'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '수영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, isSystem: true },
];

const achievements = [
  { key: 'first_log', title: '첫 기록!', description: '첫 번째 식단을 기록했습니다.' },
  { key: '7_day_streak', title: '7일 연속', description: '7일 연속으로 기록했습니다.' },
  { key: '30_day_streak', title: '한 달 챔피언', description: '30일 연속 기록을 달성했습니다!' },
  { key: 'protein_goal', title: '단백질 마스터', description: '단백질 목표를 5번 달성했습니다.' },
  { key: 'first_workout', title: '첫 운동', description: '첫 번째 운동을 기록했습니다.' },
  { key: 'weight_loss_1', title: '1kg 감량', description: '1kg 감량에 성공했습니다!' },
];

export async function seed(dataSource: DataSource) {
  const foodRepo = dataSource.getRepository(FoodItem);
  const workoutRepo = dataSource.getRepository(WorkoutTemplate);
  const achievementRepo = dataSource.getRepository(Achievement);

  const existingFoods = await foodRepo.count();
  if (existingFoods < FOOD_DATA.length) {
    // 이름 기준으로 중복 방지하며 삽입
    const existingNames = new Set(
      (await foodRepo.find({ select: ['name'] })).map((f) => f.name),
    );
    const newFoods = foods.filter((f) => !existingNames.has(f.name!));
    if (newFoods.length > 0) {
      await foodRepo.save(newFoods.map((f) => foodRepo.create(f)));
      console.log(`✅ Food items seeded (${newFoods.length}개 추가, 총 ${existingFoods + newFoods.length}개)`);
    }
  }

  const existingWorkouts = await workoutRepo.count();
  if (existingWorkouts === 0) {
    await workoutRepo.save(workouts.map((w) => workoutRepo.create(w)));
    console.log('✅ Workout templates seeded');
  }

  const existingAchievements = await achievementRepo.count();
  if (existingAchievements === 0) {
    await achievementRepo.save(achievements.map((a) => achievementRepo.create(a)));
    console.log('✅ Achievements seeded');
  }
}
