import { Column, Entity, ManyToOne } from 'typeorm'
import { instanceToPlain } from 'class-transformer'
import { Abstract } from '@entities/abstract.entity'
import { Appointment } from '@entities/appointment.entity'
import { Service } from '@entities/service.entity'
import { ObjectType } from '@nestjs/graphql'

@Entity('services_provided')
@ObjectType()
export class ServiceProvided extends Abstract {
  @ManyToOne(() => Appointment)
  appointment!: Appointment

  @ManyToOne(() => Service)
  service!: Service

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  price!: number

  toJson() {
    return instanceToPlain(this)
  }
}
