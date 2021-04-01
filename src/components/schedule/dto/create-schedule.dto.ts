import { IsDate, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  readonly employee: string;

  @IsDate()
  readonly ftom: Date;

  @IsDate()
  readonly to: Date;
}
