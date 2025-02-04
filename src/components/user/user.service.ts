import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { UpdateStatusUserDto } from './dto/update-status-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { TokenService } from '@components/token/token.service';
import { ApiHttpResponse } from '@enums/api-http-response.enum';
import { TokenType } from '@enums/token-type.enum';
import { AuthResponse } from '@interfaces/auth-response.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User | any>,
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery;

    const users = await this.userRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
    });

    return {
      users,
      status: true,
    };
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne(id);

      return user;
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }
  }

  async findCurrentUser(username: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { username } });
    const payload = { username };
    const token = this.jwtService.sign(payload);

    const { id, email } = user;

    return {
      id,
      email,
      username,
      token,
    };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const isEmailTaken = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (isEmailTaken) {
        return {
          message: ApiHttpResponse.EMAIL_TAKEN,
        };
      }

      const user = this.userRepository.create(createUserDto);

      const userInserted = await this.userRepository.save(user);

      if (userInserted) {
        // insert data to token table
        const tokenInfo = {
          user: user.id,
          token: bcrypt.hashSync(user.email, 12),
          type: TokenType.EMAIL_VERIFICATION_REQUEST,
          validTo: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        };

        this.tokenService.create(tokenInfo);
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const token = this.jwtService.sign(payload);

      return {
        user: {
          ...user.toJSON(),
          token,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const isValid = user.compare(password);

    if (!isValid) {
      throw new UnauthorizedException(ApiHttpResponse.INVALID_CREDENTIALS);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    /*
     * not used ATM
    const decoded = this.jwtService.verify(token);
    const userId = decoded.id;
    */

    return {
      ...user,
      token,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }

  async changeRole(id: string, updateRoleUserDto: UpdateRoleUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateRoleUserDto,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }
  }

  async changeStatus(id: string, updateStatusUserDto: UpdateStatusUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateStatusUserDto,
      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }
  }
}
