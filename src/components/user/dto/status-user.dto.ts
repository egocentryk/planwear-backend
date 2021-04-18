enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
  INACTIVE = 'inactive',
}

export class StatusUserDto {
  readonly status: UserStatus;
}
