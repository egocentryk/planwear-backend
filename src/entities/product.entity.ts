import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '../helpers/slugify';

import { Abstract } from './abstract.entity';
import { User } from './user.entity';

@Entity('products')
export class Product extends Abstract {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug: string;

  @Column({
    nullable: true,
  })
  content: string;

  @ManyToOne(() => User)
  author: User;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJson() {
    return classToPlain(this);
  }
}
