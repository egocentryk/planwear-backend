import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from '@entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateRoleUserDto } from './dto/update-role-user.dto'
import { UpdateStatusUserDto } from './dto/update-status-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { TokenService } from '@components/token/token.service'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { TokenType } from '@enums/token-type.enum'
import { AuthResponse } from '@interfaces/auth-response.interface'
import * as bcrypt from 'bcryptjs'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateUserInput } from './dto/create-user.input'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User | any>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(paginationQueryInput: PaginationQueryInput) {
    const { limit, offset, order = 'DESC' } = paginationQueryInput

    const users = await this.userRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
    })

    return users
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return user
  }

  async findCurrentUser(username: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { username } })
    const payload = { username }
    const token = this.jwtService.sign(payload)

    const { id, email } = user

    return {
      id,
      email,
      username,
      token,
    }
  }

  async create(createUserInput: CreateUserInput) {
    try {
      const isEmailTaken = await this.userRepository.findOne({
        where: {
          email: createUserInput.email,
        },
      })

      if (isEmailTaken) {
        throw new ConflictException(ApiHttpResponse.EMAIL_TAKEN)
      }

      const user = this.userRepository.create(createUserInput)

      const userInserted = await this.userRepository.save(user)

      if (userInserted) {
        // insert data to token table
        const tokenInfo = {
          user: user.id,
          token: bcrypt.hashSync(user.email, 12),
          type: TokenType.EMAIL_VERIFICATION_REQUEST,
          validTo: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        }

        this.tokenService.create(tokenInfo)
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      }

      const token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME') || '1d',
      })

      const userWithToken = {
        ...user,
        token,
      }

      return userWithToken as User
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      console.error('Error creating user:', error)
      throw new InternalServerErrorException('Failed to create user')
    }
  }

  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<LoginUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    })

    const isValid = user.compare(password)

    if (!isValid) {
      throw new UnauthorizedException(ApiHttpResponse.INVALID_CREDENTIALS)
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    const token = this.jwtService.sign(payload)

    /*
     * not used ATM
    const decoded = this.jwtService.verify(token);
    const userId = decoded.id;
    */

    return {
      ...user,
      token,
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
      })

      return this.userRepository.save(user)
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id)

    return this.userRepository.remove(user)
  }

  async changeRole(id: string, updateRoleUserDto: UpdateRoleUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateRoleUserDto,
      })

      return this.userRepository.save(user)
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }
  }

  async changeStatus(id: string, updateStatusUserDto: UpdateStatusUserDto) {
    try {
      const user = await this.userRepository.preload({
        id: id,
        ...updateStatusUserDto,
      })

      return this.userRepository.save(user)
    } catch (error) {
      throw new NotFoundException(`User #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }
  }
}
