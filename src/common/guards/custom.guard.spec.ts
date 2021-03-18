import { jwtCustomGuard } from './custom.guard';

describe('Custom.GuardGuard', () => {
  it('should be defined', () => {
    expect(new jwtCustomGuard()).toBeDefined();
  });
});
