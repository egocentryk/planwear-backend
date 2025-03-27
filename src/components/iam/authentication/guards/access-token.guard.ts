import jwtConfig from '@components/iam/config/jwt.config'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'
import { REQUEST_USER_KEY } from '@components/iam/iam.constants'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)
    const ctx = gqlContext.getContext()

    const request = ctx.req

    // Try to get token from different sources
    let token = this.extractTokenFromHeader(request)

    // If no Authorization header, try to get from cookies
    if (!token && request.cookies) {
      token = request.cookies.accessToken
    }

    if (!token) {
      throw new UnauthorizedException('Access token not found')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      })

      // Store user info in both the request and the GraphQL context
      request[REQUEST_USER_KEY] = payload
      ctx[REQUEST_USER_KEY] = payload
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
