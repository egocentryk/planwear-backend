import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '../helpers/slugify';

import { Abstract } from '../entities/abstract.entity';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';

@Entity('articles')
export class Article extends Abstract {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug: string;

  @Column({
    nullable: true
  })
  content: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
