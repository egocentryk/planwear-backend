import { Injectable } from '@nestjs/common'
import { HashingService } from './hashing.service'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt()

    return hash(this.dataParse(data), salt)
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(this.dataParse(data), encrypted)
  }

  dataParse(data) {
    return Buffer.isBuffer(data) ? data.toString('utf8') : data
  }
}
