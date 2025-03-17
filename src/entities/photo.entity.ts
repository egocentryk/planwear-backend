import { Column, Entity, ManyToOne } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Article } from '@entities/article.entity'
import { User } from '@entities/user.entity'
import { ObjectType } from '@nestjs/graphql'

@Entity('photos')
@ObjectType()
export class Photo extends Abstract {
  @IsNotEmpty()
  @Column()
  title!: string

  @IsNotEmpty()
  @Column()
  filename!: string

  @ManyToOne(() => User)
  author!: User

  @ManyToOne(() => Article, (article) => article.photos)
  article!: Article

  toJSON() {
    return instanceToPlain(this)
  }
}
