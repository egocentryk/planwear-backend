import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '@helpers/slugify';

import { Abstract } from '@entities/abstract.entity';
import { Company } from '@entities/company.entity';
import { ServiceCategory } from '@entities/service-category.entity';

@Entity('services')
export class Service extends Abstract {
  @IsNotEmpty()
  @Column()
  title!: string;

  @Column()
  @IsNotEmpty()
  slug?: string;

  @ManyToOne(() => Company)
  company!: Company;

  @ManyToOne(() => ServiceCategory)
  category!: ServiceCategory;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  price!: number;

  @Column()
  duration!: number;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJson() {
    return classToPlain(this);
  }
}
