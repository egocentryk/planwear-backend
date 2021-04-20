import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly content!: string;

  @IsString()
  readonly author!: string;

  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[] | any;
}
