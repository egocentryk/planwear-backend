import { NotFoundException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Company } from '@entities/company.entity'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-comapny.input'
import { User } from '@entities/user.entity'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(paginationQueryInput: PaginationQueryInput) {
    const { limit, offset, order = 'DESC' } = paginationQueryInput

    return this.companyRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
      relations: ['employees'],
    })
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['employees'],
    })

    if (!company) {
      throw new NotFoundException(`Company #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return company
  }

  async create(createCompanyInput: CreateCompanyInput) {
    let employees = [] as User[]

    if (
      createCompanyInput.employeeIds &&
      createCompanyInput.employeeIds.length > 0
    ) {
      employees = await this.userRepository.findBy({
        id: In(createCompanyInput.employeeIds),
      })
    }

    // Find the owner
    const owner = await this.userRepository.findOneBy({
      id: createCompanyInput.owner,
    })

    if (!owner) {
      throw new NotFoundException(
        `Owner with ID ${createCompanyInput.owner} not found`,
      )
    }

    const company = this.companyRepository.create({
      title: createCompanyInput.title,
      content: createCompanyInput.content,
      owner,
      employees,
    })

    return this.companyRepository.save(company)
  }

  async update(id: string, updateCompanyInput: UpdateCompanyInput) {
    const company = await this.companyRepository.preload({
      id: id,
      ...updateCompanyInput,
    })

    if (!company) {
      throw new NotFoundException(`Company #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return this.companyRepository.save(company)
  }

  async remove(id: string) {
    const company = await this.findOne(id)

    return this.companyRepository.remove(company)
  }
}
