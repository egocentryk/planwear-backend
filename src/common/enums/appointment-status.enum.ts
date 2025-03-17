import { registerEnumType } from '@nestjs/graphql'

export enum AppointmentStatus {
  CANCELED = 'canceled',
  FINISHED = 'finished',
  PENDING = 'pending',
}

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
})
