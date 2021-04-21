import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { Public } from '@decorators/public.decorator';
import { Profile } from '@decorators/profile.decorator';
import { User } from '@entities/user.entity';
import { UpdateStatusUserDto } from './dto/update-status-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async findCurrentUser(@Profile() { username }: User) {
    const user = await this.userService.findCurrentUser(username);

    return { user };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch('/role/:id')
  changeRole(
    @Param('id') id: string,
    @Body(ValidationPipe) updateRoleUserDto: UpdateRoleUserDto,
  ) {
    return this.userService.changeRole(id, updateRoleUserDto);
  }

  @Patch('/status/:id')
  changeStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStatusUserDto: UpdateStatusUserDto,
  ) {
    return this.userService.changeStatus(id, updateStatusUserDto);
  }
}
