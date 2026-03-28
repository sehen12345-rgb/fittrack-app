import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthProvider } from '../common/enums';
import * as bcrypt from 'bcryptjs';

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string, def: string) => def),
};

const mockUserRepo = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('이메일 중복 시 ConflictException 발생', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: 'existing-id' });
      await expect(service.register({ email: 'test@test.com', password: 'password123', nickname: '테스트' }))
        .rejects.toThrow(ConflictException);
    });

    it('정상 가입 시 토큰 반환', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ id: 'new-id', email: 'test@test.com' });

      const result = await service.register({ email: 'test@test.com', password: 'password123', nickname: '테스트' });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('login', () => {
    it('존재하지 않는 이메일로 로그인 시 UnauthorizedException', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      await expect(service.login({ email: 'notfound@test.com', password: 'pw' }))
        .rejects.toThrow(UnauthorizedException);
    });

    it('잘못된 비밀번호로 로그인 시 UnauthorizedException', async () => {
      const hash = await bcrypt.hash('correctPassword', 12);
      mockUsersService.findByEmail.mockResolvedValue({ id: 'uid', email: 'u@t.com', passwordHash: hash });
      await expect(service.login({ email: 'u@t.com', password: 'wrongPassword' }))
        .rejects.toThrow(UnauthorizedException);
    });

    it('올바른 자격증명으로 로그인 성공', async () => {
      const hash = await bcrypt.hash('correctPassword', 12);
      mockUsersService.findByEmail.mockResolvedValue({ id: 'uid', email: 'u@t.com', passwordHash: hash });
      const result = await service.login({ email: 'u@t.com', password: 'correctPassword' });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('refreshToken', () => {
    it('유효하지 않은 토큰 시 UnauthorizedException', async () => {
      mockJwtService.verify.mockImplementation(() => { throw new Error('invalid'); });
      await expect(service.refreshToken('invalid-token')).rejects.toThrow(UnauthorizedException);
    });

    it('유효한 토큰으로 새 토큰 발급', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'uid', email: 'u@t.com' });
      const result = await service.refreshToken('valid-token');
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('findOrCreateOAuthUser', () => {
    it('기존 소셜 계정이 있으면 토큰 반환', async () => {
      mockUserRepo.findOne.mockResolvedValue({ id: 'uid', email: 'u@t.com' });
      const result = await service.findOrCreateOAuthUser({
        provider: 'GOOGLE', providerId: 'google123', email: 'u@t.com', nickname: '유저',
      });
      expect(result).toHaveProperty('accessToken');
    });

    it('신규 소셜 유저 생성', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ id: 'new-id', email: 'new@test.com' });
      const result = await service.findOrCreateOAuthUser({
        provider: 'GOOGLE', providerId: 'google456', email: 'new@test.com', nickname: '신규',
      });
      expect(result).toHaveProperty('accessToken');
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });
});
