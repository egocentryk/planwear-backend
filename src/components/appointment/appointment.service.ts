import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { Appointment } from '@entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ScheduleService } from '@components/schedule/schedule.service';
import { ApiHttpResponse } from '@enums/api-http-response.enum';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly scheduleService: ScheduleService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery;

    return this.appointmentRepository.find({
      relations: ['company', 'employeeCreated', 'employee', 'client'],
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne(id, {
      relations: ['company', 'employeeCreated', 'employee', 'client'],
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return appointment;
  }

  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create(createAppointmentDto);

    // update employee schedule
    const schedule = {
      employee: appointment.employee,
      from: appointment.startTime,
      to: appointment.endTimeExpected,
    };

    const scheduled = this.scheduleService.create(schedule);

    if (scheduled) {
      return this.appointmentRepository.save(appointment);
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto,
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);

    return this.appointmentRepository.remove(appointment);
  }
}
