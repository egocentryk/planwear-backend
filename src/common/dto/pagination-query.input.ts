import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsPositive } from 'class-validator'

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@InputType()
export class PaginationQueryInput {
  @Field(() => Number, { description: 'Number of items per page' })
  @IsOptional()
  @IsPositive()
  limit?: number

  @IsOptional()
  @IsPositive()
  offset?: number

  @IsEnum(Order)
  @IsOptional()
  order?: Order
}
