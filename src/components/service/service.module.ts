import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Company } from '@entities/company.entity';
import { Service } from '@entities/service.entity';
import { ServiceCategory } from '@entities/service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Service, ServiceCategory])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
