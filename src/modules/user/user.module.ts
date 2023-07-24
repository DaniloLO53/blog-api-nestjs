import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
    UserService,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}
