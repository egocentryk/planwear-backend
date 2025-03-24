import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

import slugify from '@helpers/slugify'

import { Abstract } from '@entities/abstract.entity'
import { Comment } from '@entities/comment.entity'
import { Photo } from '@entities/photo.entity'
import { Tag } from '@entities/tag.entity'
import { User } from '@entities/user.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('articles')
@ObjectType()
export class Article extends Abstract {
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

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
  })
  content!: string

  @Field(() => Number)
  @Column({ default: 0 })
  recommendations?: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.articles)
  author: User

  @Field(() => Comment, { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.article)
  comments?: Comment[]

  @Field(() => [Photo], { nullable: true })
  @OneToMany(() => Photo, (photo) => photo.article)
  photos?: Photo[]

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  @JoinTable()
  tags?: Tag[]

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
