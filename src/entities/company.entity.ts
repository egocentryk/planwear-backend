import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from '../helpers/slugify';

import { User } from '../entities/user.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

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
