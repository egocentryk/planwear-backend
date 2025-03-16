import { User } from '@entities/user.entity'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UserResolver {
  @Query(() => [User], { name: 'users' })
  async findAll() {
    return []
  }
}
