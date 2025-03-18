import { NotFoundException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Token } from '@entities/token.entity'
import { UpdateTokenDto } from './dto/update-token.dto'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { CreateTokenInput } from './dto/create-token.input'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async findAll() {
    return await this.tokenRepository.find()
  }

  async findOne(id: string) {
    const token = await this.tokenRepository.findOne({ where: { id } })

    if (!token) {
      throw new NotFoundException(`Token #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return token
  }

  async create(createTokenInput: CreateTokenInput) {
    const token = this.tokenRepository.create(createTokenInput)

    return await this.tokenRepository.save(token)
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    const token = await this.tokenRepository.preload({
      id: id,
      ...updateTokenDto,
    })

    if (!token) {
      throw new NotFoundException(`Token #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return this.tokenRepository.save(token)
  }

  async remove(id: string) {
    const token = await this.findOne(id)

    return this.tokenRepository.remove(token)
  }
}
