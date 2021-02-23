import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from '../../entities/article.entity';
import { Comment } from '../../entities/comment.entity';
import { Event } from '../../entities/event.entity';
import { Photo } from '../../entities/photo.entity';
import { Tag } from '../../entities/tag.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment, Event, Photo, Tag, User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})

export class ArticleModule {}
