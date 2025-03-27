import { Module } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'
import { AuthenticationResolver } from './authentication/authentication.resolver'
import { AuthenticationService } from './authentication/authentication.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities/user.entity'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from './config/jwt.config'
import { APP_GUARD } from '@nestjs/core'
import { AuthenticationGuard } from './authentication/guards/authentication.guard'
import { AccessTokenGuard } from './authentication/guards/access-token.guard'

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthenticationResolver,
    AuthenticationService,
  ],
})
export class IamModule {}
