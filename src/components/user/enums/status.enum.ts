import { registerEnumType } from '@nestjs/graphql'

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
  INACTIVE = 'inactive',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
})
