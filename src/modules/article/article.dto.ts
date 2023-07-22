import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;
}
