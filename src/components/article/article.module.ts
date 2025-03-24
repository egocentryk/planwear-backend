import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleService } from './article.service'
import { Article } from '@entities/article.entity'
import { Comment } from '@entities/comment.entity'
import { Event } from '@entities/event.entity'
import { Photo } from '@entities/photo.entity'
import { Tag } from '@entities/tag.entity'
import { User } from '@entities/user.entity'
import { ArticleResolver } from './article.resolver'

import articleConfig from './config/article.config'

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, Event, Photo, Tag, User]),
    ConfigModule.forFeature(articleConfig),
  ],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
