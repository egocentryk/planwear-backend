import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne(id);

    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }

    return company;
  }

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);

    return this.companyRepository.save(company);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.preload({
      id: +id,
      ...updateCompanyDto,
    });

    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }

    return this.companyRepository.save(company);
  }

  async remove(id: string) {
    const company = await this.findOne(id);

    return this.companyRepository.remove(company);
  }
}
