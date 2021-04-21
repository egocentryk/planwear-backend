import { Column, Entity, ManyToOne } from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Abstract } from '@entities/abstract.entity';
import { Article } from '@entities/article.entity';
import { User } from '@entities/user.entity';

@Entity('photos')
export class Photo extends Abstract {
  @IsNotEmpty()
  @Column()
  title!: string;

  @IsNotEmpty()
  @Column()
  filename!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Article, (article) => article.photos)
  article!: Article;

  toJSON() {
    return classToPlain(this);
  }
}
