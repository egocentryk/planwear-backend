import { IsString } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly company: string;
}
