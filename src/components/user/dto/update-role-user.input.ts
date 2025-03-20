import { InputType, PartialType } from '@nestjs/graphql'
import { RoleUserInput } from './role-user.input'

@InputType()
export class UpdateRoleUserInput extends PartialType(RoleUserInput) {}
