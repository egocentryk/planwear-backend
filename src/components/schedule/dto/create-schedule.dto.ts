import { IsDate, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  readonly employee!: string | any;

  @IsDate()
  readonly from!: Date;

  @IsDate()
  readonly to!: Date;
}
