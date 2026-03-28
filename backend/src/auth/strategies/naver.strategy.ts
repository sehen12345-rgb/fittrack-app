import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get('NAVER_CLIENT_ID', 'DISABLED'),
      clientSecret: config.get('NAVER_CLIENT_SECRET', 'DISABLED'),
      callbackURL: config.get('NAVER_CALLBACK_URL', 'http://localhost:4000/api/auth/naver/callback'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { id, displayName, emails, photos } = profile;
    const user = await this.authService.findOrCreateOAuthUser({
      provider: 'NAVER',
      providerId: String(id),
      email: emails?.[0]?.value,
      nickname: displayName || `naver_${id}`,
      profileImageUrl: photos?.[0]?.value,
    });
    done(null, user);
  }
}
