import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly content!: string;

  @IsString()
  readonly owner!: string;

  @IsInt({ each: true })
  @IsOptional()
  readonly employees?: number[];
}
