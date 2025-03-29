import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  @IsNotEmpty()
  refreshToken: string
}
