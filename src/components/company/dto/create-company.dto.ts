import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsInt()
  readonly ownerId: number;

  @IsInt({ each: true })
  @IsOptional()
  readonly employees: number[];
}
