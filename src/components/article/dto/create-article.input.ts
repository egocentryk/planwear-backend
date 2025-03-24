import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  @IsString()
  readonly title!: string

  @Field(() => String)
  @IsString()
  readonly content!: string

  @Field(() => String)
  @IsString()
  readonly author: string

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[] | any
}
