import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @MinLength(10)
  password: string
}
