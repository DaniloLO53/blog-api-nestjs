import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserLogin } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserSanitized } from './user.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userLogin: UserLogin): Promise<UserSanitized> | null {
    const { password, email } = userLogin;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      const passwordValidate = await bcrypt.compare(password, user.password);
      if (passwordValidate) {
        const { password: pass, ...userSanitized } = user;
        return userSanitized;
      }
    }
    return null;
  }

  async login(userSanitized: UserSanitized) {
    const payload = { ...userSanitized, sub: userSanitized.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
