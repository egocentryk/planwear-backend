import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthenticationService } from './authentication.service'
import { User } from '@entities/user.entity'
import { SignUpInput } from './dto/sign-up.input'
import { SignInInput } from './dto/sign-in.input'

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => User, { name: 'singUp' })
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authenticationService.signUp(signUpInput)
  }

  @Mutation(() => User, { name: 'signIn' })
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authenticationService.signIn(signInInput)
  }
}
