import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

import { AppointmentStatus } from '@entities/appointment.entity';

export class CreateAppointmentDto {
  @IsString()
  readonly employeeCreated: string;

  @IsString()
  readonly employee: string;

  @IsString()
  readonly client: string;

  @IsString()
  readonly company: any | string;

  @IsDate()
  readonly startTime: Date;

  @IsDate()
  readonly endTimeExpected: Date;

  @IsDate()
  @IsOptional()
  readonly endTime: Date;

  @IsString()
  readonly status: AppointmentStatus.PENDING

  @IsOptional()
  readonly canceled: boolean;
}
