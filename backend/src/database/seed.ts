import { DataSource } from 'typeorm';
import { FoodItem } from '../food/food-item.entity';
import { WorkoutTemplate } from '../workout/workout-template.entity';
import { Achievement } from '../achievements/achievement.entity';
import { WorkoutCategory } from '../common/enums';
import { FOOD_DATA } from './food-data';

const foods: Partial<FoodItem>[] = FOOD_DATA;

const workouts: Partial<WorkoutTemplate>[] = [
  // ━━ 가슴 ━━
  { name: '벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps', 'shoulders'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '인클라인 벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps', 'shoulders'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '디클라인 벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '덤벨 플라이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '인클라인 덤벨 플라이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '케이블 크로스오버', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '딥스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps'], equipmentRequired: ['dip_bar'], isSystem: true },
  { name: '푸시업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps', 'shoulders'], equipmentRequired: [], isSystem: true },
  { name: '와이드 푸시업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest'], equipmentRequired: [], isSystem: true },
  { name: '덤벨 벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '펙덱 플라이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest'], equipmentRequired: ['pec_deck'], isSystem: true },
  { name: '체스트 프레스 머신', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps'], equipmentRequired: ['chest_press_machine'], isSystem: true },

  // ━━ 등 ━━
  { name: '데드리프트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'glutes', 'hamstrings'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '루마니안 데드리프트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'hamstrings', 'glutes'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '스모 데드리프트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'glutes', 'quads'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '풀업 / 턱걸이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['pullup_bar'], isSystem: true },
  { name: '친업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['pullup_bar'], isSystem: true },
  { name: '바벨로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '원암 덤벨로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '시티드 케이블로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '랫풀다운', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '언더핸드 랫풀다운', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: 'T바 로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['t_bar'], isSystem: true },
  { name: '페이스풀', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['rear_delts', 'back'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '벤트오버로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },

  // ━━ 어깨 ━━
  { name: '숄더프레스 (바벨)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'triceps'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '덤벨 숄더프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'triceps'], equipmentRequired: ['dumbbell'], isSystem: true },
  { name: '사이드 레터럴 레이즈', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders'], equipmentRequired: ['dumbbell', 'cable'], isSystem: true },
  { name: '프론트 레이즈', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders'], equipmentRequired: ['dumbbell', 'barbell'], isSystem: true },
  { name: '리어 델토이드 플라이', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['rear_delts', 'shoulders'], equipmentRequired: ['dumbbell', 'cable'], isSystem: true },
  { name: '업라이트 로우', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'traps'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '아놀드 프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders'], equipmentRequired: ['dumbbell'], isSystem: true },
  { name: '케이블 사이드 레터럴', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '숄더프레스 머신', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'triceps'], equipmentRequired: ['shoulder_press_machine'], isSystem: true },

  // ━━ 이두 ━━
  { name: '바벨 바이셉컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '덤벨 바이셉컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['dumbbell'], isSystem: true },
  { name: '해머컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps', 'brachialis'], equipmentRequired: ['dumbbell'], isSystem: true },
  { name: '인클라인 덤벨컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '케이블 바이셉컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '컨센트레이션 컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['dumbbell'], isSystem: true },
  { name: 'EZ바 컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['ez_bar'], isSystem: true },
  { name: '프리처컬', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['biceps'], equipmentRequired: ['barbell', 'preacher_bench'], isSystem: true },

  // ━━ 삼두 ━━
  { name: '트라이셉스 푸쉬다운', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '트라이셉스 익스텐션 (오버헤드)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['dumbbell', 'barbell'], isSystem: true },
  { name: '스컬크러셔', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['barbell', 'ez_bar', 'bench'], isSystem: true },
  { name: '딥스 (삼두)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps', 'chest'], equipmentRequired: ['dip_bar'], isSystem: true },
  { name: '클로즈그립 벤치프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps', 'chest'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '케이블 오버헤드 익스텐션', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '덤벨 킥백', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['triceps'], equipmentRequired: ['dumbbell'], isSystem: true },

  // ━━ 하체 ━━
  { name: '스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'hamstrings'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '프론트 스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '고블릿 스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['dumbbell', 'kettlebell'], isSystem: true },
  { name: '핵 스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['hack_squat_machine'], isSystem: true },
  { name: '레그프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['leg_press'], isSystem: true },
  { name: '런지', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'hamstrings'], equipmentRequired: [], isSystem: true },
  { name: '불가리안 스플릿 스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '레그컬 (누운)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['hamstrings'], equipmentRequired: ['leg_curl_machine'], isSystem: true },
  { name: '레그컬 (앉은)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['hamstrings'], equipmentRequired: ['leg_curl_machine'], isSystem: true },
  { name: '레그 익스텐션', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads'], equipmentRequired: ['leg_extension_machine'], isSystem: true },
  { name: '힙 쓰러스트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['glutes', 'hamstrings'], equipmentRequired: ['barbell', 'bench'], isSystem: true },
  { name: '덤벨 힙 쓰러스트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['glutes', 'hamstrings'], equipmentRequired: ['dumbbell', 'bench'], isSystem: true },
  { name: '글루트 킥백', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['glutes'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '카프 레이즈 (서서)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['calves'], equipmentRequired: [], isSystem: true },
  { name: '카프 레이즈 (앉아서)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['calves'], equipmentRequired: ['seated_calf_machine'], isSystem: true },
  { name: '스텝업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: ['bench'], isSystem: true },
  { name: '수모 스쿼트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['glutes', 'inner_thigh', 'quads'], equipmentRequired: ['dumbbell', 'barbell'], isSystem: true },
  { name: '싱글레그 데드리프트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['hamstrings', 'glutes', 'back'], equipmentRequired: ['dumbbell', 'barbell'], isSystem: true },

  // ━━ 코어 ━━
  { name: '플랭크', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'abs'], equipmentRequired: [], isSystem: true },
  { name: '사이드 플랭크', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'obliques'], equipmentRequired: [], isSystem: true },
  { name: '크런치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs'], equipmentRequired: [], isSystem: true },
  { name: '레그 레이즈', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: [], isSystem: true },
  { name: '행잉 레그 레이즈', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: ['pullup_bar'], isSystem: true },
  { name: '바이시클 크런치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'obliques'], equipmentRequired: [], isSystem: true },
  { name: '케이블 크런치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs'], equipmentRequired: ['cable_machine'], isSystem: true },
  { name: '러시안 트위스트', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['obliques', 'core'], equipmentRequired: ['weight_plate', 'dumbbell'], isSystem: true },
  { name: '데드버그', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'abs'], equipmentRequired: [], isSystem: true },
  { name: '힐 탭', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['obliques'], equipmentRequired: [], isSystem: true },
  { name: '버드독', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'back'], equipmentRequired: [], isSystem: true },
  { name: 'V업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: [], isSystem: true },
  { name: '토 터치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs'], equipmentRequired: [], isSystem: true },
  { name: '드래곤 플래그', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'core'], equipmentRequired: ['bench'], isSystem: true },
  { name: '애브 롤아웃', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['abs', 'core'], equipmentRequired: ['ab_roller'], isSystem: true },

  // ━━ 전신 / 복합 ━━
  { name: '버피', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '케틀벨 스윙', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['glutes', 'hamstrings', 'back', 'core'], equipmentRequired: ['kettlebell'], isSystem: true },
  { name: '클린 앤 프레스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body', 'shoulders'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '스내치', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '파워 클린', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body'], equipmentRequired: ['barbell'], isSystem: true },
  { name: '쓰러스터', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body', 'quads', 'shoulders'], equipmentRequired: ['barbell', 'dumbbell'], isSystem: true },
  { name: '박스 점프', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'calves'], equipmentRequired: ['box'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '마운틴 클라이머', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['core', 'shoulders', 'quads'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '배틀로프', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['shoulders', 'arms', 'core'], equipmentRequired: ['battle_rope'], caloriesBurnedPerMinute: 13, isSystem: true },

  // ━━ 유산소 ━━
  { name: '러닝 (실내)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['treadmill'], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '러닝 (야외)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '인터벌 러닝', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['treadmill'], caloriesBurnedPerMinute: 13, isSystem: true },
  { name: '사이클 (실내)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['bike'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '사이클 (야외)', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['bike'], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '스피닝', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['spin_bike'], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '줄넘기', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['rope'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '이중 줄넘기', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: ['rope'], caloriesBurnedPerMinute: 15, isSystem: true },
  { name: '수영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '크롤 수영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '걷기', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: [], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '파워워킹', category: WorkoutCategory.CARDIO, targetMuscleGroups: [], equipmentRequired: [], caloriesBurnedPerMinute: 6, isSystem: true },
  { name: '계단 오르기', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '로잉 머신', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['back', 'arms', 'core'], equipmentRequired: ['rowing_machine'], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '크로스 트레이너 (일립티컬)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['elliptical'], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '에어바이크', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['air_bike'], caloriesBurnedPerMinute: 14, isSystem: true },
  { name: '킥복싱', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '탭보', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '줌바', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: 'HIIT (고강도인터벌)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 15, isSystem: true },

  // ━━ 유연성 / 스트레칭 ━━
  { name: '요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, isSystem: true },
  { name: '필라테스', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['core', 'full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '폼롤러 (전신)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['foam_roller'], caloriesBurnedPerMinute: 2, isSystem: true },
  { name: '햄스트링 스트레칭', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['hamstrings'], equipmentRequired: [], caloriesBurnedPerMinute: 2, isSystem: true },
  { name: '고관절 스트레칭', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['hip_flexors', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 2, isSystem: true },
  { name: '어깨/흉추 스트레칭', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['shoulders', 'back'], equipmentRequired: [], caloriesBurnedPerMinute: 2, isSystem: true },
  { name: '바닥 스트레칭 (전신)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 2, isSystem: true },
  { name: '태극권', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 3, isSystem: true },

  // ━━ 러닝 프로그램 ━━
  { name: '5K 달리기', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 10, description: '5킬로미터 달리기 훈련', isSystem: true },
  { name: '10K 달리기', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 10, description: '10킬로미터 달리기 훈련', isSystem: true },
  { name: '하프마라톤 훈련', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '마라톤 훈련', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '트레일 러닝', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 11, description: '산길·비포장도로 달리기', isSystem: true },
  { name: '템포런', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves'], equipmentRequired: [], caloriesBurnedPerMinute: 12, description: '젖산 역치를 높이는 지속 빠른 페이스 달리기', isSystem: true },
  { name: '파틀렉 훈련', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves', 'glutes'], equipmentRequired: [], caloriesBurnedPerMinute: 11, description: '속도를 자유롭게 변화시키는 스웨덴식 달리기', isSystem: true },
  { name: '런닝 드릴 (고니 들기)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'hip_flexors'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '런닝 드릴 (뒤꿈치 차기)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['hamstrings', 'calves'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },

  // ━━ 필라테스 ━━
  { name: '필라테스 (헌드레드)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'core'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, description: '호흡과 함께 복부 수축을 100회 반복', isSystem: true },
  { name: '필라테스 (롤업)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'back'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, description: '척추를 한 마디씩 분절하며 올라오는 동작', isSystem: true },
  { name: '필라테스 (레그 서클)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['hip_flexors', 'abs'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, isSystem: true },
  { name: '필라테스 (롤링 라이크 어볼)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['back', 'abs'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, description: '척추 마사지 동작', isSystem: true },
  { name: '필라테스 (싱글 레그 스트레치)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '필라테스 (더블 레그 스트레치)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '필라테스 (시저)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'hip_flexors', 'hamstrings'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '필라테스 (크리스크로스)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['obliques', 'abs'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '필라테스 (스완)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['back', 'glutes'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, description: '엎드린 자세에서 상체를 들어올리는 척추 신전', isSystem: true },
  { name: '필라테스 (티저)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['abs', 'hip_flexors'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, description: 'V자 모양으로 균형 잡는 고급 동작', isSystem: true },
  { name: '필라테스 (사이드 킥)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['glutes', 'hip_abductors', 'core'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, isSystem: true },
  { name: '필라테스 (스윔)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['back', 'glutes', 'hamstrings'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, description: '수영하듯 팔다리를 교차로 들어올리는 동작', isSystem: true },
  { name: '필라테스 (플랭크 투 다운독)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['core', 'shoulders', 'hamstrings'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '리포머 필라테스', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['reformer'], caloriesBurnedPerMinute: 5, description: '스프링 저항 기구를 활용한 필라테스', isSystem: true },
  { name: '매트 필라테스', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['core', 'full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, isSystem: true },

  // ━━ 크로스핏 / 기능성 훈련 ━━
  { name: '크로스핏 WOD', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 14, description: 'Workout of the Day — 다양한 고강도 복합 운동', isSystem: true },
  { name: '크로스핏 머피 (Murph)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['pullup_bar'], caloriesBurnedPerMinute: 13, description: '런닝 1마일 + 풀업 100 + 푸시업 200 + 스쿼트 300 + 런닝 1마일', isSystem: true },
  { name: '크로스핏 신디 (Cindy)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['pullup_bar'], caloriesBurnedPerMinute: 13, description: '20분 AMRAP: 풀업 5 + 푸시업 10 + 스쿼트 15', isSystem: true },
  { name: '크로스핏 헬렌 (Helen)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['kettlebell', 'pullup_bar'], caloriesBurnedPerMinute: 13, description: '3라운드: 400m 달리기 + 케틀벨 스윙 21 + 풀업 12', isSystem: true },
  { name: '크로스핏 파란 (Fran)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body'], equipmentRequired: ['barbell'], caloriesBurnedPerMinute: 14, description: '쓰러스터 + 풀업 21-15-9 반복', isSystem: true },
  { name: 'AMRAP 훈련', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 13, description: 'As Many Rounds/Reps As Possible — 정해진 시간 내 최대 반복', isSystem: true },
  { name: 'EMOM 훈련', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 12, description: 'Every Minute On the Minute — 1분마다 정해진 횟수 수행', isSystem: true },
  { name: '타바타 인터벌', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 15, description: '20초 고강도 + 10초 휴식 × 8세트', isSystem: true },
  { name: '맨메이커', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body'], equipmentRequired: ['dumbbell'], caloriesBurnedPerMinute: 13, description: '덤벨 로우 + 푸시업 + 스쿼트 + 프레스 복합 동작', isSystem: true },
  { name: '터키시 겟업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body', 'core', 'shoulders'], equipmentRequired: ['kettlebell', 'dumbbell'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '월볼 (Wall Ball)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'shoulders'], equipmentRequired: ['medicine_ball', 'wall'], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '슬래머볼 (Slam Ball)', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['full_body', 'core'], equipmentRequired: ['slam_ball'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '핸드스탠드 푸시업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['shoulders', 'triceps', 'core'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '머슬업', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'chest', 'triceps'], equipmentRequired: ['pullup_bar', 'rings'], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '링 딥스', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['chest', 'triceps'], equipmentRequired: ['rings'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '로프 클라임', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['back', 'biceps', 'core'], equipmentRequired: ['rope'], caloriesBurnedPerMinute: 10, isSystem: true },

  // ━━ 요가 (종류별) ━━
  { name: '빈야사 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 5, description: '호흡에 맞춰 흐르듯 연결하는 동적 요가', isSystem: true },
  { name: '하타 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 3, description: '정적 자세를 유지하며 스트레칭하는 기초 요가', isSystem: true },
  { name: '아쉬탕가 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 6, description: '정해진 순서를 빠르게 수행하는 고강도 요가', isSystem: true },
  { name: '인 요가 (음 요가)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body', 'hip_flexors'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 2, description: '자세를 3~5분 유지하는 깊은 결합조직 스트레칭', isSystem: true },
  { name: '리스토라티브 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat', 'bolster'], caloriesBurnedPerMinute: 2, description: '도구를 이용해 완전히 이완하는 회복 요가', isSystem: true },
  { name: '핫 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 7, description: '40°C 환경에서 수행하는 고온 요가', isSystem: true },
  { name: '파워 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['full_body', 'core'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 6, isSystem: true },
  { name: '쿤달리니 요가', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['core', 'full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 4, description: '에너지 각성을 목표로 하는 요가', isSystem: true },

  // ━━ 수영 (종류별) ━━
  { name: '자유형 (크롤)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body', 'back', 'shoulders'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '배영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['back', 'shoulders', 'legs'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '평영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['chest', 'inner_thigh', 'legs'], equipmentRequired: [], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '접영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['chest', 'back', 'shoulders', 'core'], equipmentRequired: [], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '수영 인터벌', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 12, description: '짧은 거리를 빠르게 반복하는 고강도 수영', isSystem: true },
  { name: '아쿠아 에어로빅', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 6, description: '물속에서 하는 에어로빅 운동', isSystem: true },
  { name: '오픈워터 수영', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 11, isSystem: true },

  // ━━ 댄스 / 에어로빅 ━━
  { name: '줌바 피트니스', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 8, description: '라틴댄스 기반 유산소 운동', isSystem: true },
  { name: '에어로빅', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 7, isSystem: true },
  { name: '힙합 댄스 피트니스', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '바레 (Barre)', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['glutes', 'quads', 'core'], equipmentRequired: ['barre'], caloriesBurnedPerMinute: 5, description: '발레 동작 기반 소근육 강화 훈련', isSystem: true },
  { name: 'K-팝 댄스', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 7, isSystem: true },
  { name: '재즈댄스 피트니스', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 7, isSystem: true },
  { name: '살사댄스', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 6, isSystem: true },
  { name: '벨리댄스', category: WorkoutCategory.FLEXIBILITY, targetMuscleGroups: ['core', 'obliques', 'hips'], equipmentRequired: [], caloriesBurnedPerMinute: 5, isSystem: true },

  // ━━ 격투기 / 무술 ━━
  { name: '복싱', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['shoulders', 'arms', 'core'], equipmentRequired: ['boxing_gloves', 'punching_bag'], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '킥복싱 (무에타이)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['boxing_gloves', 'punching_bag'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '태권도', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body', 'quads', 'calves'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '유도', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '브라질리언 주짓수', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body', 'core'], equipmentRequired: ['mat'], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: 'MMA (종합격투기)', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '쿵푸 / 무술', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '복싱 섀도우 (섀도우복싱)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['shoulders', 'arms', 'core'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },

  // ━━ 실내 기구 추가 ━━
  { name: '스텝퍼 (계단 기구)', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'glutes', 'calves'], equipmentRequired: ['stepper'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '핸드바이크', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['shoulders', 'arms', 'core'], equipmentRequired: ['hand_bike'], caloriesBurnedPerMinute: 6, isSystem: true },
  { name: '버티컬 클라이머', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['full_body'], equipmentRequired: ['climber_machine'], caloriesBurnedPerMinute: 11, isSystem: true },
  { name: '슬레드 푸시/풀', category: WorkoutCategory.STRENGTH, targetMuscleGroups: ['quads', 'glutes', 'calves', 'back'], equipmentRequired: ['sled'], caloriesBurnedPerMinute: 12, isSystem: true },
  { name: '트램폴린 운동', category: WorkoutCategory.CARDIO, targetMuscleGroups: ['quads', 'calves', 'core'], equipmentRequired: ['trampoline'], caloriesBurnedPerMinute: 8, isSystem: true },

  // ━━ 스포츠 ━━
  { name: '농구', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '축구', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: [], caloriesBurnedPerMinute: 9, isSystem: true },
  { name: '배드민턴', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body', 'shoulders', 'arms'], equipmentRequired: ['racket'], caloriesBurnedPerMinute: 7, isSystem: true },
  { name: '테니스', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['full_body'], equipmentRequired: ['racket'], caloriesBurnedPerMinute: 8, isSystem: true },
  { name: '탁구', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['arms', 'shoulders'], equipmentRequired: ['table_tennis'], caloriesBurnedPerMinute: 5, isSystem: true },
  { name: '볼링', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['arms', 'shoulders'], equipmentRequired: [], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '골프', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['core', 'shoulders', 'back'], equipmentRequired: ['golf_club'], caloriesBurnedPerMinute: 4, isSystem: true },
  { name: '클라이밍', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['back', 'biceps', 'core', 'legs'], equipmentRequired: [], caloriesBurnedPerMinute: 10, isSystem: true },
  { name: '인라인 스케이팅', category: WorkoutCategory.SPORTS, targetMuscleGroups: ['quads', 'glutes', 'calves'], equipmentRequired: ['inline_skate'], caloriesBurnedPerMinute: 8, isSystem: true },
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
  if (existingWorkouts < workouts.length) {
    const existingNames = new Set(
      (await workoutRepo.find({ select: ['name'] })).map((w) => w.name),
    );
    const newWorkouts = workouts.filter((w) => !existingNames.has(w.name!));
    if (newWorkouts.length > 0) {
      await workoutRepo.save(newWorkouts.map((w) => workoutRepo.create(w)));
      console.log(`✅ Workout templates seeded (${newWorkouts.length}개 추가, 총 ${existingWorkouts + newWorkouts.length}개)`);
    }
  }

  const existingAchievements = await achievementRepo.count();
  if (existingAchievements === 0) {
    await achievementRepo.save(achievements.map((a) => achievementRepo.create(a)));
    console.log('✅ Achievements seeded');
  }
}
