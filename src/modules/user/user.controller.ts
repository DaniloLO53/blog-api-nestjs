import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { UserSignUp } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('auth/sign-up')
  async createUser(@Body() userData: UserSignUp) {
    return await this.userService.createUser(userData);
  }
}
