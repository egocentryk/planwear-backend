import { User } from '@entities/user.entity'
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HashingService } from '../hashing/hashing.service'
import { SignUpInput } from './dto/sign-up.input'
import { SignInInput } from './dto/sign-in.input'
import { JwtService } from '@nestjs/jwt'
import jwtConfig from '../config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { AuthResponse } from './dto/auth-response'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    try {
      const { password, ...userData } = signUpInput

      const user = {
        ...userData,
        password: await this.hashingService.hash(password),
      }

      await this.userRepository.save(user)

      return user
    } catch (err) {
      const pgUniqueViolationErrorCode = 23505

      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException()
      }

      throw err
    }
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponse> {
    const user = await this.userRepository.findOneBy({
      email: signInInput.email,
    })

    if (!user) {
      throw new UnauthorizedException('User does not exist')
    }

    const isEqual = await this.hashingService.compare(
      signInInput.password,
      user.password,
    )

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match')
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    )

    return {
      accessToken,
    }
  }
}
