import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsInt()
  readonly authorId: number;

  @IsString({ each: true })
  @IsOptional()
  readonly tag: string[];
}