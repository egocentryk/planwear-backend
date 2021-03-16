import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export interface AuthResponse {
  id?: string;
  email?: string;
  token: string;
  username: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly jwtService: JwtService
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery;

    const users = await this.userRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: order,
      }
    });

    return {
      users,
      status: true,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findCurrentUser(username: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { username } });
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { ...user, token };
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        ...user.toJSON(),
        token
      }
    }
  }

  async login({
    email,
    password
  }): Promise<LoginUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      }
    });

    const isValid = user.compare(password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    const token = this.jwtService.sign(payload);

    /*
     * not used ATM
    const decoded = this.jwtService.verify(token);
    const userId = decoded.id;
    */

    return {
      ...user,
      token
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }

  async changeRole(id: string, updateRoleUserDto: UpdateRoleUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateRoleUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(user);
  }
}
