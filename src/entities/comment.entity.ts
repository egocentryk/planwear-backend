import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Abstract } from '@entities/abstract.entity';
import { Article } from '@entities/article.entity';
import { User } from '@entities/user.entity';

@Entity('comments')
export class Comment extends Abstract {
  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  toJSON() {
    return classToPlain(this);
  }
}
