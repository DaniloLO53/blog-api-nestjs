import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import { LocalStrategy } from './modules/auth/local.strategy';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(passport.initialize());
  await app.listen(3000);
}
bootstrap();
