import { BeforeInsert, Column, Entity, ManyToMany, OneToMany } from 'typeorm'
import { Exclude, instanceToPlain } from 'class-transformer'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { ApiHttpResponse } from '@common/enums/api-http-response.enum'
import { UserRole, UserStatus } from '@enums/user.enum'
import * as bcrypt from 'bcryptjs'
import { Field, ObjectType } from '@nestjs/graphql'
import { Company } from './company.entity'
import { Article } from './article.entity'
import { Token } from './token.entity'

@Entity('users')
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

  @ManyToMany((type) => Company, (company) => company.employees)
  companies?: Company[]

  @OneToMany(() => Article, (article) => article.user)
  articles?: Article[]

  @OneToMany(() => Token, (token) => token.user)
  tokens?: Token[]

  @Field()
  @Column({
    default: UserRole.USER,
    enum: UserRole,
    type: 'enum',
  })
  role?: UserRole

  @Field()
  @Column({
    default: false,
  })
  isBlocked?: boolean

  @Field()
  @Column({
    default: UserStatus.INACTIVE,
    enum: UserStatus,
    type: 'enum',
  })
  status?: UserStatus

  @Field(() => String, { nullable: true })
  token?: string // This field won't be stored in the database, just for GraphQL

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
