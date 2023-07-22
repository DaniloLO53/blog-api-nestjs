import { Body, Controller, Post } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() articleData: ArticleDto) {
    return await this.articleService.createArticle(articleData);
  }
}
