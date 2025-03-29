import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken: string

  @Field(() => String)
  refreshToken: string
}
