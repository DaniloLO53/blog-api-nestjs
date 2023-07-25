import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  // @Public()
  @Roles(Role.Moderator)
  @Get('profile/:id')
  getProfile(@Request() request: any) {
    return request.user;
  }

  @Public()
  @Get('all')
  findAll() {
    return [];
  }
}
