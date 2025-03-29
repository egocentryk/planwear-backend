import { UserRole } from '@components/user/enums/role.enum'

export interface ActiveUserData {
  /**
   * The "subject" of the token. The value is the user ID that granted this token
   */
  sub: string

  /**
   * The subject's (user) email
   */
  email: string

  /**
   * The subject's (user) role
   */
  role: UserRole
}
