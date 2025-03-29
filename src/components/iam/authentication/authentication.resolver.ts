import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthenticationService } from './authentication.service'
import { User } from '@entities/user.entity'
import { SignUpInput } from './dto/sign-up.input'
import { SignInInput } from './dto/sign-in.input'
import { AuthResponse } from './dto/auth-response'
import { Response } from 'express'
import { Auth } from './decorators/auth.decorator'
import { AuthType } from './enums/auth-type.enum'
import { RefreshTokenInput } from './dto/refresh-token.input'

@Auth(AuthType.None)
@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => User, { name: 'singUp' })
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authenticationService.signUp(signUpInput)
  }

  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Context() context: { res: Response },
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<AuthResponse> {
    const authResponse = await this.authenticationService.signIn(signInInput)

    context.res.cookie('accessToken', authResponse.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    })

    return authResponse
  }

  @Mutation(() => AuthResponse, { name: 'refreshToken' })
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ) {
    return this.authenticationService.refreshTokens(refreshTokenInput)
  }
}
