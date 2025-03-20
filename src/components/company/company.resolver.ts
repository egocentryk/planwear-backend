import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CompanyService } from './company.service'
import { Company } from '@entities/company.entity'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-comapny.input'

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company], { name: 'companies' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    return this.companyService.findAll(paginationQueryInput)
  }

  @Query(() => Company, { name: 'company' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.companyService.findOne(id)
  }

  @Mutation(() => Company, { name: 'createCompany' })
  async create(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput)
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.update(id, updateCompanyInput)
  }

  @Mutation(() => Boolean, { name: 'removeCompany' })
  async remove(@Args('id', { type: () => String }) id: string) {
    await this.companyService.remove(id)
    return true

    // another approach for deleting data, not used ATM
    // try {
    //   await this.companyService.remove(id)
    //   return {
    //     success: true,
    //     message: 'Company successfully deleted',
    //     deletedId: id,
    //   }
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: error.message,
    //   }
    // }
  }
}
