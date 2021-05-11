import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '@entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiHttpResponse } from '@enums/api-http-response.enum';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne(id);

    if (!service) {
      throw new NotFoundException(
        `Service #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return service;
  }

  create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(service);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      id: id,
      ...updateServiceDto,
    });

    if (!service) {
      throw new NotFoundException(
        `Service #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return this.serviceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);

    return this.serviceRepository.remove(service);
  }
}
