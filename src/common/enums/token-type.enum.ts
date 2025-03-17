import { registerEnumType } from '@nestjs/graphql'

export enum TokenType {
  EMAIL_VERIFICATION_REQUEST = 'emailVerificationToken',
  EMAIL_CHANGE_REQUEST = 'emailChangeToken',
  PASSWORD_CHANGE_REQUEST = 'passwordChangeToken',
  PASSWORD_FORGOT_REQUEST = 'passwordForgotToken',
  PASSWORD_RESET_REQUEST = 'passwordResetToken',
}

registerEnumType(TokenType, {
  name: 'TokenType',
})
