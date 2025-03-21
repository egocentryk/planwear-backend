import { PartialType } from '@nestjs/graphql'
import { CreateScheduleDto } from './create-schedule.dto'

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
