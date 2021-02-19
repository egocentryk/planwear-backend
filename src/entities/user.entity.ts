import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Company } from '../entities/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany((type) => Company, (company) => company.employees)
  companies: Company[];

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase();
  }
}
