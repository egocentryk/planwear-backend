import { Column, Entity, ManyToOne } from 'typeorm'
import { Abstract } from '@entities/abstract.entity'
import { Company } from '@entities/company.entity'
import { User } from '@entities/user.entity'
import { AppointmentStatus } from '@enums/appointment-status.enum'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity('appointments')
@ObjectType()
export class Appointment extends Abstract {
  @Field(() => User)
  @ManyToOne(() => User)
  employeeCreated: User

  @Field(() => User)
  @ManyToOne(() => User)
  employee: User

  @Field(() => User)
  @ManyToOne(() => User)
  client: User

  @Field(() => Company)
  @ManyToOne(() => Company)
  company: Company

  @Field(() => AppointmentStatus)
  @Column({
    default: AppointmentStatus.PENDING,
    enum: AppointmentStatus,
    type: 'enum',
  })
  status: AppointmentStatus

  @Field(() => Date)
  @Column('timestamp')
  startTime: Date

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  endTimeExpected: Date

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  endTime: Date

  // this is the sum off all the booked services prices
  @Field(() => Number, { nullable: true })
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceExpected: number

  /*
    sum of all provided services, it can differ from priceExpected.
    Client may changed their mind or added a service.
    Price of the service could also change between the booking time
    and the time service was provided.
  */
  @Field(() => Number, { nullable: true })
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceFull: number

  @Field(() => Number, { nullable: true })
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  discount: number

  @Field(() => Number, { nullable: true })
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceFinal: number

  @Field(() => Boolean, { nullable: true })
  @Column('bool', {
    nullable: true,
  })
  canceled: boolean

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
  })
  cancelationReason: string
}
