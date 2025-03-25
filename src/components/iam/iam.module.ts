import { Module } from '@nestjs/common'
import { HashingService } from './hashing/hashing.service'
import { BcryptService } from './hashing/bcrypt.service'

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class IamModule {}
