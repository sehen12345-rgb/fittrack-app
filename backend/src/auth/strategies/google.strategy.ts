import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    const apiBase = config.get<string>('API_BASE_URL') || `http://localhost:${config.get('PORT', '4000')}`;
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID') || 'DISABLED',
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET') || 'DISABLED',
      callbackURL: config.get<string>('GOOGLE_CALLBACK_URL') || `${apiBase}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, emails, displayName, photos } = profile;
    const user = await this.authService.findOrCreateOAuthUser({
      provider: 'GOOGLE',
      providerId: id,
      email: emails?.[0]?.value,
      nickname: displayName || emails?.[0]?.value?.split('@')[0],
      profileImageUrl: photos?.[0]?.value,
    });
    done(null, user);
  }
}
