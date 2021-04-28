export enum ApiHttpResponse {
  ALLOWED_CHARACTERS = 'only letters, numbers and special signs: .-_ are allowed',
  CATEGORY_IN_COMPANY_TAKEN = 'category name within current company already taken',
  EMAIL_ALIAS = 'cannot be an email alias',
  EMAIL_TAKEN = 'email address already taken',
  INVALID_CREDENTIALS = 'invalid credentials',
  NOT_FOUND = 'not found in database',
}
