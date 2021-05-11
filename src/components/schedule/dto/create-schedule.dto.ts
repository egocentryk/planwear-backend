import { IsDate, IsString } from 'class-validator';
import { User } from '@entities/user.entity';

export class CreateScheduleDto {
  @IsString()
  readonly employee!: User;

  @IsDate()
  readonly from!: Date;

  @IsDate()
  readonly to!: Date;
}
