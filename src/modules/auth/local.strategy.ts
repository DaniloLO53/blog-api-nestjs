import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin } from './auth.dto';
import { UserSanitized } from './user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(userLogin: UserLogin): Promise<UserSanitized> | never {
    const user = await this.authService.validateUser(userLogin);

    if (!user) {
      throw new UnauthorizedException({
        message: 'No user found',
      });
    }
    return user;
  }
}
