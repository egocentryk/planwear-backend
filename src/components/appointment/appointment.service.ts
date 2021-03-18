import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery;

    return this.appointmentRepository.find({
      relations: [
        'company',
        'employeeCreated',
        'employee',
        'client'
      ],
      skip: offset,
      take: limit,
      order: {
        id: order,
      }
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne(id, {
      relations: [
        'company',
        'employeeCreated',
        'employee',
        'client'
      ]
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment #${id} not found`);
    }

    return appointment;
  }

  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create(createAppointmentDto);

    return this.appointmentRepository.save(appointment);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment #${id} not found`);
    }

    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);

    return this.appointmentRepository.remove(appointment);
  }
}
