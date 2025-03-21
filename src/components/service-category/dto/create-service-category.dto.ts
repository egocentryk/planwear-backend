import { IsString } from 'class-validator'
import { Company } from '@entities/company.entity'
import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateServiceCategoryDto {
  @IsString()
  readonly title!: string

  @IsString()
  readonly company!: Company
}
