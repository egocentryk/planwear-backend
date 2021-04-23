export enum ApiHttpResponse {
  ALLOWED_CHARACTERS = 'Only letters, numbers and special signs: .-_ are allowed',
  EMAIL_ALIAS = 'cannot be an email alias',
  EMAIL_TAKEN = 'email address already taken',
  INVALID_CREDENTIALS = 'invalid credentials',
  NOT_FOUND = 'not found in database',
}
