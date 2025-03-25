import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceCategoryService } from './service-category.service'
import { ServiceCategory } from '@entities/service-category.entity'
import { ServiceCategoryResolver } from './service-category.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory])],
  providers: [ServiceCategoryService, ServiceCategoryResolver],
})
export class ServiceCategoryModule {}
