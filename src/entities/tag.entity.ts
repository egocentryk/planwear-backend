import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm'

import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import slugify from '@helpers/slugify'

import { Abstract } from '@entities/abstract.entity'
import { Article } from '@entities/article.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('tags')
@ObjectType()
export class Tag extends Abstract {
  @Field(() => String)
  @Column()
  @IsNotEmpty()
  title: string

  @Field(() => String)
  @Column()
  slug: string

  @ManyToMany((type) => Article, (article) => article.tags)
  articles!: Article[]

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
