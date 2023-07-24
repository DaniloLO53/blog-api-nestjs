import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
