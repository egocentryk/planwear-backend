import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Company } from '@entities/company.entity';
import { ServiceCategory } from '@entities/service-category.entity';

export class CreateServiceDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly company!: Company;

  @IsString()
  readonly category!: ServiceCategory;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsInt()
  @IsOptional()
  readonly duration?: number;
}
