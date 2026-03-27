import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserProfile } from './user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.email = :email AND user.isDeleted = false', { email })
      .getOne();
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    const saved = await this.userRepo.save(user);
    const profile = this.profileRepo.create({ user: saved });
    await this.profileRepo.save(profile);
    return this.findById(saved.id);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
    const user = await this.findById(userId);
    if (dto.nickname) user.nickname = dto.nickname;
    await this.userRepo.save(user);

    if (user.profile) {
      Object.assign(user.profile, {
        gender: dto.gender ?? user.profile.gender,
        birthDate: dto.birthDate ?? user.profile.birthDate,
        heightCm: dto.heightCm ?? user.profile.heightCm,
        activityLevel: dto.activityLevel ?? user.profile.activityLevel,
      });
      await this.profileRepo.save(user.profile);
    }

    return this.findById(userId);
  }

  async softDelete(userId: string): Promise<void> {
    await this.userRepo.update(userId, { isDeleted: true });
  }
}
