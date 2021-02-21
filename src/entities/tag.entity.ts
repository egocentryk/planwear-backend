import {
  BeforeInsert,
  Column,
  Entity
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '../helpers/slugify';

import { Abstract } from '../entities/abstract.entity';

@Entity('tags')
export class Tag extends Abstract {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  slug: string;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
