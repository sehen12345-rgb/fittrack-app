import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { BodyMetrics } from './body-metrics.entity';

export class CreateMetricsDto {
  recordedAt: string;
  weightKg: number;
  bodyFatPercent?: number;
  muscleMassKg?: number;
  waistCm?: number;
  hipCm?: number;
  chestCm?: number;
  armCm?: number;
  thighCm?: number;
  note?: string;
}

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(BodyMetrics)
    private readonly repo: Repository<BodyMetrics>,
  ) {}

  async getAll(userId: string, from?: string, to?: string): Promise<BodyMetrics[]> {
    const where: any = { userId };
    if (from && to) {
      where.recordedAt = Between(new Date(from), new Date(to));
    }
    return this.repo.find({ where, order: { recordedAt: 'ASC' } });
  }

  async getLatest(userId: string): Promise<BodyMetrics> {
    return this.repo.findOne({ where: { userId }, order: { recordedAt: 'DESC' } });
  }

  async create(userId: string, dto: CreateMetricsDto): Promise<BodyMetrics> {
    const metrics = this.repo.create({ ...dto, userId, recordedAt: new Date(dto.recordedAt) });
    return this.repo.save(metrics);
  }

  async update(userId: string, id: string, dto: Partial<CreateMetricsDto>): Promise<BodyMetrics> {
    const metrics = await this.repo.findOne({ where: { id, userId } });
    if (!metrics) throw new NotFoundException('기록을 찾을 수 없습니다.');
    Object.assign(metrics, dto);
    return this.repo.save(metrics);
  }

  async delete(userId: string, id: string): Promise<void> {
    const metrics = await this.repo.findOne({ where: { id, userId } });
    if (!metrics) throw new NotFoundException('기록을 찾을 수 없습니다.');
    await this.repo.remove(metrics);
  }
}
