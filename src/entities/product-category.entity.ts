import { BeforeInsert, Column, Entity } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Abstract } from '@entities/abstract.entity';
import slugify from '@helpers/slugify';

@Entity('product_categories')
export class ProductCategory extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJson() {
    return classToPlain(this);
  }
}
