import { BeforeInsert, Column, Entity, OneToMany, ManyToMany } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Abstract } from '@entities/abstract.entity';
import { Article } from '@entities/article.entity';
import { Company } from '@entities/company.entity';
import { ApiHttpResponse } from '@common/enums/api-http-response.enum';
import { UserRole, UserStatus } from '@enums/user.enum';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User extends Abstract {
  @Column({
    unique: true,
  })
  @Matches(/^[a-zA-Z0-9.\-_]*$/, {
    message: ApiHttpResponse.ALLOWED_CHARACTERS,
  })
  @IsNotEmpty()
  @Length(1, 16)
  username!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^+]+@.*$/, {
    message: ApiHttpResponse.EMAIL_ALIAS,
  })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Company, (company) => company.employees)
  companies?: Company[];

  @OneToMany(() => Article, (article) => article.user)
  articles?: Article[];

  @Column({
    default: UserRole.USER,
    enum: UserRole,
    type: 'enum',
  })
  role?: UserRole;

  @Column({
    default: false,
  })
  isBlocked?: boolean;

  @Column({
    default: UserStatus.INACTIVE,
    enum: UserStatus,
    type: 'enum',
  })
  status?: UserStatus;

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  hash(): void {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  compare(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
