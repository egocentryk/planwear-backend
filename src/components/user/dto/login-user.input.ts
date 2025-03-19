import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsEmail()
  @IsString()
  readonly email!: string

  @Field(() => String)
  @IsString()
  readonly password!: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly token?: string
}
