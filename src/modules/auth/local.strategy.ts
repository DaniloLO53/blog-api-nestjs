import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserSanitized } from './user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserSanitized> | never {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException({
        message: 'No user found',
      });
    }
    return user;
  }
}
