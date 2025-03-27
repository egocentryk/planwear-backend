import { User } from '@entities/user.entity'
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateUserInput } from './dto/create-user.input'
import { LoginUserInput } from './dto/login-user.input'
import { UpdateRoleUserInput } from './dto/update-role-user.input'
import { UpdateStatusUserInput } from './dto/update-status-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { ActiveUser } from '@components/iam/decorators/active-user.decorator'
import { ActiveUserData } from '@components/iam/interfaces/active-user-data.interface'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(
    @ActiveUser() user: ActiveUserData,
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    console.log(user)
    return this.userService.findAll(paginationQueryInput)
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @Query(() => User, { name: 'currentUser' })
  async findCurrentUser(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.userService.findCurrentUser(username)
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput)
  }

  @Mutation(() => User, { name: 'loginUser' })
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.login(loginUserInput)
  }

  @Mutation(() => User, { name: 'changeUserRole' })
  async changeRole(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRoleUserInput') updateRoleUserInput: UpdateRoleUserInput,
  ) {
    return this.userService.changeRole(id, updateRoleUserInput)
  }

  @Mutation(() => User, { name: 'changeUserStatus' })
  async changeStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('updateStatusUserInput') updateRoleStatusInput: UpdateStatusUserInput,
  ) {
    return this.userService.changeStatus(id, updateRoleStatusInput)
  }

  @Mutation(() => User, { name: 'removeUser' })
  async remove(@Args('id') id: string) {
    return this.userService.remove(id)
  }
}
