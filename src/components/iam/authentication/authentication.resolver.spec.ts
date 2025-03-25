import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResolver } from './authentication.resolver';

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationResolver],
    }).compile();

    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
