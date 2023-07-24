import { Controller } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async login() {
    const email = 'dan@gmail.com';
    return this.userRepository.findByEmail(email);
  }
}
