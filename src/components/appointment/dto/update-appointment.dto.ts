import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
