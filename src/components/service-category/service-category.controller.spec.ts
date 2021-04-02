import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCategoryController } from './service-category.controller';

describe('ServiceCategoryController', () => {
  let controller: ServiceCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCategoryController],
    }).compile();

    controller = module.get<ServiceCategoryController>(ServiceCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
