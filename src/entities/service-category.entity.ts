import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Company } from '@entities/company.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import slugify from '@helpers/slugify'

@Entity('service_categories')
@ObjectType()
export class ServiceCategory extends Abstract {
  @Field(() => String)
  @Column()
  @IsNotEmpty()
  title!: string

  @Field(() => String)
  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.servicecategories)
  company?: Company

  @BeforeInsert()
  @BeforeUpdate()
  convertSlug(): void {
    this.slug = slugify(this.title)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
