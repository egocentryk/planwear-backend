import { IsString } from 'class-validator'
import { Company } from '@entities/company.entity'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateServiceCategoryInput {
  @Field(() => String)
  @IsString()
  readonly title!: string

  @Field(() => String)
  @IsString()
  readonly company!: string
}
