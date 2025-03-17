import { Column, Entity } from 'typeorm'
import { Abstract } from '@entities/abstract.entity'
import { ObjectType } from '@nestjs/graphql'

@Entity('events')
@ObjectType()
export class Event extends Abstract {
  @Column()
  type!: string

  @Column()
  name!: string

  @Column('json')
  payload?: Record<string, any>
}
