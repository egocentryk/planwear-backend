import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentResolver } from './appointment.resolver';

describe('AppointmentResolver', () => {
  let resolver: AppointmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentResolver],
    }).compile();

    resolver = module.get<AppointmentResolver>(AppointmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
