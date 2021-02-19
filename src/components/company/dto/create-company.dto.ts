import { IsInt, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly slug: string;

  @IsInt()
  readonly ownerId: number;
}
