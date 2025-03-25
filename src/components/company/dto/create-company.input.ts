import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCompanyInput {
  @Field(() => String)
  @IsString()
  readonly title!: string

  @Field(() => String)
  @IsString()
  readonly content: string

  @Field(() => String)
  @IsString()
  readonly owner: string

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly employeeIds?: string[]
}
