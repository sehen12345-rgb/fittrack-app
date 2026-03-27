import { DataSource } from 'typeorm';
import { FoodItem } from '../food/food-item.entity';
import { WorkoutTemplate } from '../workout/workout-template.entity';
import { Achievement } from '../achievements/achievement.entity';
import { FoodSource, WorkoutCategory } from '../common/enums';

const foods: Partial<FoodItem>[] = [
  { name: '닭가슴살 (삶은)', servingSizeG: 100, caloriesPerServing: 165, proteinG: 31, carbG: 0, fatG: 3.6, isVerified: true, source: FoodSource.SYSTEM },
  { name: '고구마 (찐)', servingSizeG: 100, caloriesPerServing: 86, proteinG: 1.6, carbG: 20, fatG: 0.1, isVerified: true, source: FoodSource.SYSTEM },
  { name: '흰쌀밥 (200g)', servingSizeG: 200, caloriesPerServing: 292, proteinG: 4.4, carbG: 64.2, fatG: 0.4, isVerified: true, source: FoodSource.SYSTEM },
  { name: '계란 (1개)', servingSizeG: 60, caloriesPerServing: 91, proteinG: 7.9, carbG: 0.4, fatG: 6.3, isVerified: true, source: FoodSource.SYSTEM },
  { name: '오트밀 (건조)', servingSizeG: 100, caloriesPerServing: 389, proteinG: 16.9, carbG: 66.3, fatG: 6.9, isVerified: true, source: FoodSource.SYSTEM },
  { name: '아몬드', servingSizeG: 30, caloriesPerServing: 173, proteinG: 6.3, carbG: 6, fatG: 15, isVerified: true, source: FoodSource.SYSTEM },
  { name: '바나나', servingSizeG: 120, caloriesPerServing: 107, proteinG: 1.3, carbG: 27.5, fatG: 0.4, isVerified: true, source: FoodSource.SYSTEM },
  { name: '연두부', servingSizeG: 100, caloriesPerServing: 55, proteinG: 4.9, carbG: 1.5, fatG: 3, isVerified: true, source: FoodSource.SYSTEM },
  { name: '참치캔 (물)', servingSizeG: 100, caloriesPerServing: 132, proteinG: 29.1, carbG: 0, fatG: 1.2, isVerified: true, source: FoodSource.SYSTEM },
  { name: '그릭요거트 (무지방)', servingSizeG: 150, caloriesPerServing: 100, proteinG: 17, carbG: 6, fatG: 0.7, isVerified: true, source: FoodSource.SYSTEM },
  { name: '현미밥 (200g)', servingSizeG: 200, caloriesPerServing: 274, proteinG: 5.6, carbG: 57.4, fatG: 2.2, isVerified: true, source: FoodSource.SYSTEM },
  { name: '우유 (200ml)', servingSizeG: 200, caloriesPerServing: 130, proteinG: 6.6, carbG: 9.6, fatG: 7.6, isVerified: true, source: FoodSource.SYSTEM },
  { name: '두유 (무당)', servingSizeG: 200, caloriesPerServing: 90, proteinG: 7, carbG: 8, fatG: 3, isVerified: true, source: FoodSource.SYSTEM },
  { name: '삼겹살 (생)', servingSizeG: 100, caloriesPerServing: 331, proteinG: 15.2, carbG: 0, fatG: 29.3, isVerified: true, source: FoodSource.SYSTEM },
  { name: '연어 (생)', servingSizeG: 100, caloriesPerServing: 208, proteinG: 20, carbG: 0, fatG: 13, isVerified: true, source: FoodSource.SYSTEM },
];

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
  if (existingFoods === 0) {
    await foodRepo.save(foods.map((f) => foodRepo.create(f)));
    console.log('✅ Food items seeded');
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
