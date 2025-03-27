import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { InvalidatedRefreshTokenError } from './invalidated-refresh-token-error'

export interface RefreshTokenStorageData {
  insert(userId: string, tokenId: string): Promise<void>
  validate(userId: string, tokenId: string): Promise<boolean>
  invalidate(userId: string): Promise<void>
}

@Injectable()
export class RefreshTokenIdsStorage
  implements
    RefreshTokenStorageData,
    OnApplicationBootstrap,
    OnApplicationShutdown
{
  private redisClient: Redis

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    // TODO: Ideally, I should move this to the dedicated "RedisModule"
    // instead of initiating the connection here
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    })
  }
  onApplicationShutdown(signal?: string) {
    return this.redisClient.quit()
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId)
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redisClient.get(this.getKey(userId))
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError()
    }
    return storedId === tokenId
  }

  async invalidate(userId: string): Promise<void> {
    await this.redisClient.del(this.getKey(userId))
  }

  private getKey(userId: string): string {
    return `user-${userId}`
  }
}
