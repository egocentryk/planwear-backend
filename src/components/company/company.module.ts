import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyService } from './company.service'
import { Company } from '@entities/company.entity'
import { User } from '@entities/user.entity'
import { ServiceCategory } from '@entities/service-category.entity'
import { CompanyResolver } from './company.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Company, ServiceCategory, User])],
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
