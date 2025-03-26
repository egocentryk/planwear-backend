import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  readonly password!: string
}
