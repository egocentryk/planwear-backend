import { registerEnumType } from '@nestjs/graphql'

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  CLIENT = 'client',
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
  INACTIVE = 'inactive',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
})
