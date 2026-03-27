import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { TdeeCalculatorService } from './tdee-calculator.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
    private readonly tdeeCalc: TdeeCalculatorService,
    private readonly usersService: UsersService,
  ) {}

  async getActiveGoal(userId: string): Promise<Goal> {
    const goal = await this.goalRepo.findOne({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
    if (!goal) throw new NotFoundException('활성 목표가 없습니다. 목표를 먼저 설정하세요.');
    return goal;
  }

  async getAll(userId: string): Promise<Goal[]> {
    return this.goalRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(userId: string, dto: CreateGoalDto): Promise<Goal> {
    const user = await this.usersService.findById(userId);
    if (!user.profile) throw new BadRequestException('신체 프로필을 먼저 입력해주세요.');

    const weeklyRate = dto.weeklyRateKg ?? this.defaultWeeklyRate(dto.goalType);
    const tdee = this.tdeeCalc.calculate(
      user.profile,
      dto.startWeightKg,
      dto.goalType,
      weeklyRate,
    );

    // 기존 활성 목표 비활성화
    await this.goalRepo.update({ userId, isActive: true }, { isActive: false });

    const goal = this.goalRepo.create({
      userId,
      goalType: dto.goalType,
      startDate: new Date(),
      targetDate: dto.targetDate ? new Date(dto.targetDate) : null,
      startWeightKg: dto.startWeightKg,
      targetWeightKg: dto.targetWeightKg,
      weeklyRateKg: weeklyRate,
      dailyCalorieTarget: tdee.dailyCalorieTarget,
      proteinTargetG: tdee.proteinTargetG,
      carbTargetG: tdee.carbTargetG,
      fatTargetG: tdee.fatTargetG,
    });

    return this.goalRepo.save(goal);
  }

  async update(userId: string, goalId: string, dto: Partial<CreateGoalDto>): Promise<Goal> {
    const goal = await this.goalRepo.findOne({ where: { id: goalId, userId } });
    if (!goal) throw new NotFoundException('목표를 찾을 수 없습니다.');

    if (dto.goalType || dto.startWeightKg || dto.weeklyRateKg !== undefined) {
      const user = await this.usersService.findById(userId);
      const tdee = this.tdeeCalc.calculate(
        user.profile,
        dto.startWeightKg ?? goal.startWeightKg,
        dto.goalType ?? goal.goalType,
        dto.weeklyRateKg ?? goal.weeklyRateKg,
      );
      Object.assign(goal, {
        dailyCalorieTarget: tdee.dailyCalorieTarget,
        proteinTargetG: tdee.proteinTargetG,
        carbTargetG: tdee.carbTargetG,
        fatTargetG: tdee.fatTargetG,
      });
    }

    Object.assign(goal, dto);
    return this.goalRepo.save(goal);
  }

  async deactivate(userId: string, goalId: string): Promise<void> {
    const goal = await this.goalRepo.findOne({ where: { id: goalId, userId } });
    if (!goal) throw new NotFoundException('목표를 찾을 수 없습니다.');
    goal.isActive = false;
    await this.goalRepo.save(goal);
  }

  async getTdeeRecommendation(userId: string, weightKg: number) {
    const user = await this.usersService.findById(userId);
    if (!user.profile) throw new BadRequestException('신체 프로필을 먼저 입력해주세요.');
    return {
      DIET: this.tdeeCalc.calculate(user.profile, weightKg, 'DIET' as any, -0.5),
      BULK: this.tdeeCalc.calculate(user.profile, weightKg, 'BULK' as any, 0.25),
      MAINTENANCE: this.tdeeCalc.calculate(user.profile, weightKg, 'MAINTENANCE' as any, 0),
    };
  }

  private defaultWeeklyRate(goalType: string): number {
    if (goalType === 'DIET') return -0.5;
    if (goalType === 'BULK') return 0.25;
    return 0;
  }
}
