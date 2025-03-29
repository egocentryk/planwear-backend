import { RefreshTokenIdsStorage } from './refresh-token.ids.storage'
import { ConfigService } from '@nestjs/config'

describe('RefreshTokenIdsStorage', () => {
  it('should be defined', () => {
    const mockConfigService = { get: jest.fn() } as unknown as ConfigService
    expect(new RefreshTokenIdsStorage(mockConfigService)).toBeDefined()
  })
})
