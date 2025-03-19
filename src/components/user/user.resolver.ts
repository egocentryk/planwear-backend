import { User } from '@entities/user.entity'
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateUserInput } from './dto/create-user.input'

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

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }
}
