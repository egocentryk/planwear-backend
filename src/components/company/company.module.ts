import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from '@entities/company.entity';
import { User } from '@entities/user.entity';
import { ServiceCategory } from '@entities/service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, ServiceCategory, User])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
