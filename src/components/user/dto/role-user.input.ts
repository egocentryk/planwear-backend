import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../enums/role.enum'

@InputType()
export class RoleUserInput {
  @Field(() => UserRole)
  readonly role: UserRole
}
