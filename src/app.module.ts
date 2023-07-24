import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ArticleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
