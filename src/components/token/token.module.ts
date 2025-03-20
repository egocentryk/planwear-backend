import { Module } from '@nestjs/common'
import { TokenResolver } from './token.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from '@entities/token.entity'
import { User } from '@entities/user.entity'
import { TokenService } from './token.service'

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
  providers: [TokenResolver, TokenService],
})
export class TokenModule {}
