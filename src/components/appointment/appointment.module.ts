import { Module } from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Appointment } from '@entities/appointment.entity'
import { Schedule } from '@entities/schedule.entity'
import { ScheduleService } from '@components/schedule/schedule.service'
import { AppointmentResolver } from './appointment.resolver'
import { User } from '@entities/user.entity'
import { Company } from '@entities/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Schedule, User, Company])],
  providers: [AppointmentService, ScheduleService, AppointmentResolver],
})
export class AppointmentModule {}
