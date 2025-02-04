import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from '@entities/service-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ApiHttpResponse } from '@enums/api-http-response.enum';

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
      throw new NotFoundException(
        `Service category #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return serviceCategory;
  }

  async create(createServiceCategoryDto: CreateServiceCategoryDto) {
    const isTitleTaken = await this.serviceCategoryRepository.findOne({
      where: {
        title: createServiceCategoryDto.title,
        company: createServiceCategoryDto.company,
      },
    });

    if (isTitleTaken) {
      return {
        error: true,
        message: ApiHttpResponse.CATEGORY_IN_COMPANY_TAKEN,
      };
    }

    const serviceCategory = this.serviceCategoryRepository.create(
      createServiceCategoryDto,
    );

    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const serviceCategory = await this.serviceCategoryRepository.preload({
      id: id,
      ...updateServiceCategoryDto,
    });

    if (!serviceCategory) {
      throw new NotFoundException(
        `Service category #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async remove(id: string) {
    const serviceCategory = await this.findOne(id);

    return this.serviceCategoryRepository.remove(serviceCategory);
  }
}
