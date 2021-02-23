import {
  IsEnum,
  IsOptional,
  IsPositive
} from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsEnum(Order)
  @IsOptional()
  order: Order;
}
