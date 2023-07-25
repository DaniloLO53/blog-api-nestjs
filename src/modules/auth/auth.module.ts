import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
