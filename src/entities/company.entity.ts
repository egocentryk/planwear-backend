import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import slugify from '@helpers/slugify';

import { Abstract } from '@entities/abstract.entity';
import { User } from '@entities/user.entity';
import { ServiceCategory } from '@entities/service-category.entity';

@Entity('companies')
export class Company extends Abstract {
  @Column()
  title!: string;

  @Column()
  slug!: string;

  @Column({ nullable: true })
  content?: string;

  @ManyToOne(() => User, (owner) => owner.companies)
  owner!: User;

  @JoinTable()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => User, (user) => user.companies)
  employees?: number[];

  @OneToMany(
    () => ServiceCategory,
    (servicecategory) => servicecategory.company,
  )
  servicecategories?: ServiceCategory[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }
}
