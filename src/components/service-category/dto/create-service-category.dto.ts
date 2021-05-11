import { IsString } from 'class-validator';
import { Company } from '@entities/company.entity';

export class CreateServiceCategoryDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly company!: Company;
}
