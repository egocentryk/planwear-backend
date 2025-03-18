import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TokenService } from './token.service'
import { Token } from '@entities/token.entity'

@Resolver(() => Token)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Query(() => [Token], { name: 'tokens' })
  async findAll() {
    return this.tokenService.findAll()
  }

  @ResolveField('userId', () => String, { nullable: true })
  getUserId(@Parent() token: Token) {
    return token.user?.id
  }
}
