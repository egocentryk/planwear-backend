import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ServiceCategory } from '@entities/service-category.entity'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateServiceCategoryInput } from './dto/create-service-category.input'
import { UpdateServiceCategoryInput } from './dto/update-service-category.input'

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async findAll(paginationQueryInput: PaginationQueryInput) {
    const { limit, offset, order = 'DESC' } = paginationQueryInput

    const serviceCategories = await this.serviceCategoryRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
      relations: ['company'],
    })

    return serviceCategories
  }

  async findOne(id: string) {
    const serviceCategory = await this.serviceCategoryRepository.findOne({
      where: { id },
      relations: ['company'],
    })

    if (!serviceCategory) {
      throw new NotFoundException(
        `Service category #${id} ${ApiHttpResponse.NOT_FOUND}`,
      )
    }

    return serviceCategory
  }

  async create(createServiceCategoryInput: CreateServiceCategoryInput) {
    const isTitleTaken = await this.serviceCategoryRepository.findOne({
      where: {
        title: createServiceCategoryInput.title,
        company: { id: createServiceCategoryInput.company },
      },
    })

    if (isTitleTaken) {
      return {
        error: true,
        message: ApiHttpResponse.CATEGORY_IN_COMPANY_TAKEN,
      }
    }

    const serviceCategory = this.serviceCategoryRepository.create({
      ...createServiceCategoryInput,
      company: { id: createServiceCategoryInput.company },
    })

    return this.serviceCategoryRepository.save(serviceCategory)
  }

  async update(
    id: string,
    updateServiceCategoryInput: UpdateServiceCategoryInput,
  ) {
    const { company, ...rest } = updateServiceCategoryInput

    const serviceCategory = await this.serviceCategoryRepository.preload({
      id: id,
      ...rest,
      ...(company && { company: { id: company } }),
    })

    if (!serviceCategory) {
      throw new NotFoundException(
        `Service category #${id} ${ApiHttpResponse.NOT_FOUND}`,
      )
    }

    return this.serviceCategoryRepository.save(serviceCategory)
  }

  async remove(id: string) {
    const serviceCategory = await this.findOne(id)

    return this.serviceCategoryRepository.remove(serviceCategory)
  }
}
