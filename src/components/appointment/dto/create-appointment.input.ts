import { AppointmentStatus } from '@enums/appointment-status.enum'
import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'

@InputType()
export class CreateAppointmentInput {
  @Field(() => String)
  readonly employeeCreated: string

  @Field(() => String)
  readonly employee: string

  @Field(() => String)
  readonly client: string

  @Field(() => String, { nullable: true })
  readonly company: string

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  readonly startTime: Date

  @Field(() => Date)
  @Type(() => Date)
  readonly endTimeExpected: Date

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  readonly endTime: Date

  @Field(() => AppointmentStatus)
  readonly status: AppointmentStatus.PENDING

  @Field(() => Boolean, { nullable: true })
  readonly canceled: boolean
}
