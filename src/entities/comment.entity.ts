import { Column, Entity, ManyToOne } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Article } from '@entities/article.entity'
import { User } from '@entities/user.entity'
import { ObjectType } from '@nestjs/graphql'

@Entity('comments')
@ObjectType()
export class Comment extends Abstract {
  @IsNotEmpty()
  @Column()
  content!: string

  @ManyToOne(() => User)
  author!: User

  @ManyToOne(() => Article, (article) => article.comments)
  article!: Article

  toJSON() {
    return instanceToPlain(this)
  }
}
