import { IsDate, IsOptional, IsString } from 'class-validator'

import { AppointmentStatus } from '@enums/appointment-status.enum'
import { Company } from '@entities/company.entity'
import { Field } from '@nestjs/graphql'

export class CreateAppointmentInput {
  @Field(() => String)
  readonly employeeCreated: string

  @Field(() => String)
  readonly employee: string

  @Field(() => String)
  readonly client: string

  @Field(() => Company)
  readonly company: Company

  @Field(() => Date)
  readonly startTime!: Date

  @Field(() => Date)
  readonly endTimeExpected: Date

  @Field(() => Date, { nullable: true })
  readonly endTime: Date

  @Field(() => AppointmentStatus)
  readonly status: AppointmentStatus.PENDING

  @Field(() => Boolean, { nullable: true })
  readonly canceled: boolean
}
