import { Module } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'
import { AuthenticationResolver } from './authentication/authentication.resolver'
import { AuthenticationService } from './authentication/authentication.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationResolver,
    AuthenticationService,
  ],
})
export class IamModule {}
