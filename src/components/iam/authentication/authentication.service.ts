import { User } from '@entities/user.entity'
import {
  ConflictException,
  forwardRef,
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
import { ActiveUserData } from '../interfaces/active-user-data.interface'
import { RefreshTokenInput } from './dto/refresh-token.input'
import { RefreshTokenIdsStorage } from './refresh-token.ids.storage'
import { randomUUID } from 'crypto'
import { InvalidatedRefreshTokenError } from './invalidated-refresh-token-error'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
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

    return await this.generateTokens(user)
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID()

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ])
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId)

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshTokens(refreshTokenInput: RefreshTokenInput) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenInput.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      })

      const user = await this.userRepository.findOneByOrFail({
        id: sub,
      })

      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      )
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id)
      } else {
        throw new Error('Refresh token is invalid')
      }

      return this.generateTokens(user)
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException('Access denied')
      }
      throw new UnauthorizedException()
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    )
  }
}
