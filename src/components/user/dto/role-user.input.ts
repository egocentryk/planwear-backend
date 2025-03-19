import { UserRole } from '@enums/user.enum'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RoleUserInput {
  @Field(() => UserRole)
  readonly role: UserRole
}
