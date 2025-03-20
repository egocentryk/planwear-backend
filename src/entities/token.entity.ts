import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'
import { Abstract } from '@entities/abstract.entity'
import { User } from '@entities/user.entity'
import { TokenType } from '@enums/token-type.enum'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('tokens')
@ObjectType()
export class Token extends Abstract {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  user: User

  @Field(() => String)
  @Column()
  token: string

  @Field(() => String, { nullable: true })
  @Column({
    enum: TokenType,
    nullable: true,
    type: 'enum',
  })
  type: TokenType

  @Field(() => Date)
  @Column()
  validTo: Date
}
