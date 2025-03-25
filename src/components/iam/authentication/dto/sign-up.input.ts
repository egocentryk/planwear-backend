import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  readonly firstName: string

  @Field(() => String)
  @IsString()
  readonly lastName: string

  @Field(() => String)
  @IsNotEmpty()
  username: string

  @Field(() => String)
  @MinLength(10)
  password: string
}
