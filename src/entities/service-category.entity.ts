import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Company } from '@entities/company.entity'
import slugify from '@helpers/slugify'
import { ObjectType } from '@nestjs/graphql'

@Entity('service_categories')
@ObjectType()
export class ServiceCategory extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string

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
