import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: any) {
    return request.user;
  }

  @Public()
  @Get('all')
  findAll() {
    return [];
  }
}
