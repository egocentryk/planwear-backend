import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '@helpers/slugify';

import { Abstract } from '@entities/abstract.entity';
import { User } from '@entities/user.entity';
import { ProductCategory } from '@entities/product-category.entity';

@Entity('products')
export class Product extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string;

  @Column({
    nullable: true,
  })
  content?: string;

  @ManyToOne(() => ProductCategory)
  category!: ProductCategory;

  @ManyToOne(() => User)
  author!: User;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJson() {
    return classToPlain(this);
  }
}
