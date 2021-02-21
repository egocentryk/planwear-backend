import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany
} from 'typeorm';
import slugify from '../helpers/slugify';

import { Abstract } from '../entities/abstract.entity';
import { User } from '../entities/user.entity';

@Entity('companies')
export class Company extends Abstract {
  @Column()
  title: string;

  @Column()
  slug!: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  ownerId: number;

  @JoinTable()
  @ManyToMany((type) => User, (user) => user.companies)
  employees: number[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }
}
