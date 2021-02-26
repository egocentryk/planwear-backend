import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  ManyToMany
} from 'typeorm';

import {
  classToPlain,
  Exclude,
} from 'class-transformer';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches
} from 'class-validator';

import * as bcrypt from 'bcrypt';

import { Abstract } from '../entities/abstract.entity';
import { Article } from '../entities/article.entity';
import { Company } from '../entities/company.entity';

@Entity('users')
export class User extends Abstract {
  @Column({
    unique: true,
  })
  @Matches(/^[a-zA-Z0-9.\-_]*$/, {
    message: 'Only letters, numbers and special signs: .-_ are allowed',
  })
  @IsNotEmpty()
  @Length(1, 16)
  username!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^+]+@.*$/, {
    message: 'Cannot be an email alias',
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany((type) => Company, (company) => company.employees)
  companies: Company[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  hash(): void {
    this.password = bcrypt.hashSync(this.password, 0);
  }

  compare(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
