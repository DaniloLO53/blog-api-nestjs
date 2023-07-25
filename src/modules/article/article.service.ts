import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}
  async createArticle(article: ArticleDto) {
    return 'bu';
    return await this.prismaService.article.create({
      data: {
        created_at: new Date(),
        ...article,
      },
    });
  }
}
