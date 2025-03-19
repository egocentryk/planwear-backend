import { User } from '@entities/user.entity'
import { Query, Resolver, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    return this.userService.findAll(paginationQueryInput)
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }
}
