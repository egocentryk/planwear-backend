import {
  BeforeInsert,
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
import { Company } from './company.entity';

import slugify from '../helpers/slugify';

@Entity('service_category')
export class ServiceCategory extends Abstract {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug: string;

  @ManyToOne(() => Company, (company) => company.servicecategories)
  company: Company;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}