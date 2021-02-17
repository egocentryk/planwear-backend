import { Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CompanyService {
  private company: Company[] = [
    {
      id: 1,
      title: 'Laboratorium Piękna',
      slug: 'laboratorium-piekna',
      content: 'Opis zakresu działalności firmy',
      ownerId: ['Olga', 'Daria'],
    },
  ];

  findAll() {
    return this.company;
  }

  findOne(id: string) {
    return this.company.find((item) => item.id === +id);
  }

  create(createCompanyDto: any) {
    this.company.push(createCompanyDto);
  }

  update(id: string, updateCompanyDto: any) {
    const existingCompany = this.findOne(id);

    if (existingCompany) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const companyIndex = this.company.findIndex((item) => item.id === +id);

    if (companyIndex >= 0) {
      this.company.splice(companyIndex, 1);
    }
  }
}
