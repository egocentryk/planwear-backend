enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  CLIENT = 'client',
  USER = 'user',
}

export class RoleUserDto {
  readonly role!: UserRole;
}
