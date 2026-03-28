import {
  Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Req, Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '이메일 회원가입' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '이메일 로그인' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Access Token 갱신' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  // ── Google OAuth ──────────────────────────────────────
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google 로그인 시작' })
  googleAuth() { /* passport가 처리 */ }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google 로그인 콜백' })
  async googleCallback(@Req() req: any, @Res() res: any) {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const { accessToken, refreshToken } = req.user;
    res.redirect(`${frontendUrl}/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  // ── Kakao OAuth ───────────────────────────────────────
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: '카카오 로그인 시작' })
  kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: '카카오 로그인 콜백' })
  async kakaoCallback(@Req() req: any, @Res() res: any) {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const { accessToken, refreshToken } = req.user;
    res.redirect(`${frontendUrl}/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  // ── Naver OAuth ───────────────────────────────────────
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: '네이버 로그인 시작' })
  naverAuth() {}

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: '네이버 로그인 콜백' })
  async naverCallback(@Req() req: any, @Res() res: any) {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const { accessToken, refreshToken } = req.user;
    res.redirect(`${frontendUrl}/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
}
