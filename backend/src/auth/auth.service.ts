import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthProvider } from '../common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('이미 사용 중인 이메일입니다.');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash,
      nickname: dto.nickname,
      provider: AuthProvider.LOCAL,
    });

    return this.generateTokens(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');

    return this.generateTokens(user.id, user.email);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET', 'refresh-secret'),
      });
      return this.generateTokens(payload.sub, payload.email);
    } catch {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  async findOrCreateOAuthUser(data: {
    provider: string;
    providerId: string;
    email?: string;
    nickname: string;
    profileImageUrl?: string;
  }) {
    // 기존 소셜 계정 찾기
    let user = await this.userRepo.findOne({
      where: { provider: data.provider as AuthProvider, providerId: data.providerId },
    });
    if (user) return this.generateTokens(user.id, user.email);

    // 이메일로 기존 계정 찾기 (로컬 계정과 연동)
    if (data.email) {
      user = await this.userRepo.findOne({ where: { email: data.email } });
      if (user) {
        user.provider = data.provider as AuthProvider;
        user.providerId = data.providerId;
        if (data.profileImageUrl && !user.profileImageUrl) {
          user.profileImageUrl = data.profileImageUrl;
        }
        await this.userRepo.save(user);
        return this.generateTokens(user.id, user.email);
      }
    }

    // 신규 유저 생성
    const email = data.email || `${data.provider.toLowerCase()}_${data.providerId}@healthsnack.local`;
    const newUser = await this.usersService.create({
      email,
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
      provider: data.provider as AuthProvider,
      providerId: data.providerId,
    });
    return this.generateTokens(newUser.id, newUser.email);
  }

  private generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET', 'default-secret'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '7d'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET', 'refresh-secret'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
    });
    return { accessToken, refreshToken };
  }
}
