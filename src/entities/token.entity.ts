import { Column, Entity, ManyToOne } from 'typeorm'
import { Abstract } from '@entities/abstract.entity'
import { User } from '@entities/user.entity'
import { TokenType } from '@enums/token-type.enum'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('tokens')
@ObjectType()
export class Token extends Abstract {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Field(() => String)
  @Column()
  token: string

  @Column({
    enum: TokenType,
    nullable: true,
    type: 'enum',
  })
  type: TokenType

  @Column()
  validTo: Date
}
