import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import {
  classToPlain
} from 'class-transformer';

import {
  IsNotEmpty
} from 'class-validator';

import { Abstract } from './abstract.entity';
import { Article } from './article.entity';
import { User } from './user.entity';

@Entity('photos')
export class Photo extends Abstract {
  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  filename: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Article, (article) => article.photos)
  article: Article;

  toJSON() {
    return classToPlain(this);
  }
}
