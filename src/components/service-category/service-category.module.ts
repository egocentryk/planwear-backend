import { Module } from '@nestjs/common';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from './service-category.service';

@Module({
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService]
})
export class ServiceCategoryModule {}
