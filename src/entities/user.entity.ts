import { BeforeInsert, Column, Entity, OneToMany, ManyToMany } from 'typeorm'
import { classToPlain, Exclude, instanceToPlain } from 'class-transformer'
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Article } from '@entities/article.entity'
import { Company } from '@entities/company.entity'
import { ApiHttpResponse } from '@common/enums/api-http-response.enum'
import { UserRole, UserStatus } from '@enums/user.enum'
import * as bcrypt from 'bcryptjs'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class User extends Abstract {
  @Field(() => String)
  @Column({
    unique: true,
  })
  @Matches(/^[a-zA-Z0-9.\-_]*$/, {
    message: ApiHttpResponse.ALLOWED_CHARACTERS,
  })
  username: string

  @Field(() => String)
  @Column()
  firstName: string

  @Field(() => String)
  @Column()
  lastName: string

  @Field(() => String)
  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^+]+@.*$/, {
    message: ApiHttpResponse.EMAIL_ALIAS,
  })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({
    default: UserRole.USER,
    enum: UserRole,
    type: 'enum',
  })
  role?: UserRole

  @Column({
    default: false,
  })
  isBlocked?: boolean

  @Column({
    default: UserStatus.INACTIVE,
    enum: UserStatus,
    type: 'enum',
  })
  status?: UserStatus

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase()
  }

  @BeforeInsert()
  hash(): void {
    this.password = bcrypt.hashSync(this.password, 12)
  }

  compare(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
