import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { ServiceCategoryService } from './service-category.service'
import { ServiceCategory } from '@entities/service-category.entity'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateServiceCategoryInput } from './dto/create-service-category.input'
import { UpdateServiceCategoryInput } from './dto/update-service-category.input'

@Resolver()
export class ServiceCategoryResolver {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Query(() => [ServiceCategory], { name: 'serviceCategories' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    return this.serviceCategoryService.findAll(paginationQueryInput)
  }

  @Query(() => ServiceCategory, { name: 'serviceCategory' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.serviceCategoryService.findOne(id)
  }

  @Mutation(() => ServiceCategory, { name: 'createServiceCategory' })
  async create(
    @Args('createServiceCategoryInput')
    createServiceCategoryInput: CreateServiceCategoryInput,
  ) {
    return this.serviceCategoryService.create(createServiceCategoryInput)
  }

  @Mutation(() => ServiceCategory, { name: 'updateServiceCategory' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateServiceCategoryInput')
    updateServiceCategoryInput: UpdateServiceCategoryInput,
  ) {
    return this.serviceCategoryService.update(id, updateServiceCategoryInput)
  }

  @Mutation(() => Boolean, { name: 'removeServiceCategory' })
  async remove(@Args('id') id: string) {
    return this.serviceCategoryService.remove(id)
  }
}
