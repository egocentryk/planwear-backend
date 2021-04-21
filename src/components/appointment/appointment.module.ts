import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@entities/appointment.entity';
import { Schedule } from '@entities/schedule.entity';
import { ScheduleService } from '@components/schedule/schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Schedule])],
  controllers: [AppointmentController],
  providers: [AppointmentService, ScheduleService],
})
export class AppointmentModule {}
