import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  readonly username: string

  @Field(() => String)
  @IsString()
  readonly firstName: string

  @Field(() => String)
  @IsString()
  readonly lastName: string

  @Field(() => String)
  @IsEmail()
  @IsString()
  readonly email: string

  @Field(() => String)
  @IsString()
  readonly password: string
}
