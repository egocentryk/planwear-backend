import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../../entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
