import { TokenType } from '@common/enums/token-type.enum'
import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateTokenInput {
  @Field(() => String, { description: 'A user ID in uuid format' })
  @IsUUID(4)
  @IsNotEmpty()
  user: string

  @Field(() => String, { nullable: true })
  @IsString()
  token: string

  @Field(() => String, { nullable: true })
  @IsEnum(TokenType)
  type?: TokenType

  @Field(() => Date, { nullable: true })
  @IsDate()
  validTo?: Date
}
