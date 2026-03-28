import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get('KAKAO_CLIENT_ID', 'DISABLED'),
      callbackURL: config.get('KAKAO_CALLBACK_URL', 'http://localhost:4000/api/auth/kakao/callback'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { id, username, _json } = profile;
    const kakaoAccount = _json?.kakao_account || {};
    const user = await this.authService.findOrCreateOAuthUser({
      provider: 'KAKAO',
      providerId: String(id),
      email: kakaoAccount.email,
      nickname: username || kakaoAccount.profile?.nickname || `kakao_${id}`,
      profileImageUrl: kakaoAccount.profile?.profile_image_url,
    });
    done(null, user);
  }
}
