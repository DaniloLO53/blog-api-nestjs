import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local' })],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
