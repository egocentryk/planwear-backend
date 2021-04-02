import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from '@entities/service-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  findAll() {
    return this.serviceCategoryRepository.find({
      relations: ['company'],
    });
  }

  async findOne(id: string) {
    const serviceCategory = await this.serviceCategoryRepository.findOne(id, {
      relations: ['company'],
    });

    if (!serviceCategory) {
      throw new NotFoundException(`Service category #${id} not found in database`);
    }

    return serviceCategory;
  }

  create(createServiceCategoryDto: CreateServiceCategoryDto) {
    const serviceCategory = this.serviceCategoryRepository.create(createServiceCategoryDto);

    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const serviceCategory = await this.serviceCategoryRepository.preload({
      id: id,
      ...updateServiceCategoryDto,
    });

    if (!serviceCategory) {
      throw new NotFoundException(`Service category #${id} not found in database`);
    }

    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async remove(id: string) {
    const serviceCategory = await this.findOne(id);

    return this.serviceCategoryRepository.remove(serviceCategory);
  }
}
