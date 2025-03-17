import { BeforeInsert, Column, Entity } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import slugify from '@helpers/slugify'
import { ObjectType } from '@nestjs/graphql'

@Entity('countries')
@ObjectType()
export class Country extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
