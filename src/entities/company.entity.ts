import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm'
import { Abstract } from '@entities/abstract.entity'
import { User } from '@entities/user.entity'
import { ServiceCategory } from '@entities/service-category.entity'
import slugify from '@helpers/slugify'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('companies')
@ObjectType()
export class Company extends Abstract {
  @Field(() => String)
  @Column()
  title: string

  @Field(() => String)
  @Column()
  slug!: string

  @Column({ nullable: true })
  content: string

  @ManyToOne(() => User, (owner) => owner.companies)
  owner!: User

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  @JoinTable()
  employees?: User[]

  @OneToMany(
    () => ServiceCategory,
    (servicecategory) => servicecategory.company,
  )
  servicecategories?: ServiceCategory[]

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug(): void {
    this.slug = slugify(this.title)
  }
}
