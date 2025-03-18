import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { TokenService } from './token.service'
import { Token } from '@entities/token.entity'
import { CreateTokenInput } from './dto/create-token.input'
import { UpdateTokenInput } from './dto/update-token.input'

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

  @Query(() => Token, { name: 'token' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.tokenService.findOne(id)
  }

  @Mutation(() => Token, { name: 'createToken' })
  async create(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput)
  }

  @Mutation(() => Token, { name: 'updateToken' })
  async update(
    @Args('id') id: string,
    @Args('updateTokenInput') updateTokenInput: UpdateTokenInput,
  ) {
    return this.tokenService.update(id, updateTokenInput)
  }

  @Mutation(() => Token, { name: 'removeToken' })
  async remove(@Args('id') id: string) {
    return this.tokenService.remove(id)
  }
}
