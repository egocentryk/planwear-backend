import { Field, InputType } from '@nestjs/graphql'
import { UserStatus } from '../enums/status.enum'

@InputType()
export class StatusUserInput {
  @Field(() => UserStatus)
  readonly status: UserStatus
}
