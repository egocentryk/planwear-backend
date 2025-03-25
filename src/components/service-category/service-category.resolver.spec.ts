import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCategoryResolver } from './service-category.resolver';

describe('ServiceCategoryResolver', () => {
  let resolver: ServiceCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceCategoryResolver],
    }).compile();

    resolver = module.get<ServiceCategoryResolver>(ServiceCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
