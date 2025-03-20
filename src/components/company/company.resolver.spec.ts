import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyResolver],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
