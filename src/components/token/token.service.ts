import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '@entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiHttpResponse } from '@enums/api-http-response.enum';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  findAll() {
    return this.tokenRepository.find();
  }

  async findOne(id: string) {
    const token = await this.tokenRepository.findOne(id);

    if (!token) {
      throw new NotFoundException(`Token #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }

    return token;
  }

  create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);

    return this.tokenRepository.save(token);
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    const token = await this.tokenRepository.preload({
      id: id,
      ...updateTokenDto,
    });

    if (!token) {
      throw new NotFoundException(`Token #${id} ${ApiHttpResponse.NOT_FOUND}`);
    }

    return this.tokenRepository.save(token);
  }

  async remove(id: string) {
    const token = await this.findOne(id);

    return this.tokenRepository.remove(token);
  }
}
