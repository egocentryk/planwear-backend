import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCategoryService } from './service-category.service';

describe('ServiceCategoryService', () => {
  let service: ServiceCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceCategoryService],
    }).compile();

    service = module.get<ServiceCategoryService>(ServiceCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
