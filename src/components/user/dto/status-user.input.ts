import { UserStatus } from '@enums/user.enum'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StatusUserInput {
  @Field(() => UserStatus)
  readonly status: UserStatus
}
