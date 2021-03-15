import { IsDate, IsOptional, IsString } from 'class-validator';

import { AppointmentStatus } from '../../../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsString()
  readonly employeeCreated: string;

  @IsString()
  readonly employee: string;

  @IsString()
  readonly client: string;

  @IsString()
  readonly company: string;

  @IsDate()
  readonly startTime: Date;

  @IsDate()
  readonly endTimeExpected: Date;

  @IsDate()
  readonly endTime: Date;

  @IsString()
  readonly status: AppointmentStatus.PENDING
}
