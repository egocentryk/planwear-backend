import { IsDate, IsOptional, IsString } from 'class-validator';

import { AppointmentStatus } from '@enums/appointment-status.enum';
import { Company } from '@entities/company.entity';

export class CreateAppointmentDto {
  @IsString()
  readonly employeeCreated!: string;

  @IsString()
  readonly employee!: string;

  @IsString()
  readonly client!: string;

  @IsString()
  readonly company!: Company;

  @IsDate()
  readonly startTime!: Date;

  @IsDate()
  readonly endTimeExpected!: Date;

  @IsDate()
  @IsOptional()
  readonly endTime?: Date;

  @IsString()
  readonly status!: AppointmentStatus.PENDING;

  @IsOptional()
  readonly canceled?: boolean;
}
