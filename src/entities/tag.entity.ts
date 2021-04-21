import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '@helpers/slugify';

import { Abstract } from '@entities/abstract.entity';
import { Article } from '@entities/article.entity';

@Entity('tags')
export class Tag extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string;

  @Column()
  slug!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Article, (article) => article.tags)
  articles!: Article[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
