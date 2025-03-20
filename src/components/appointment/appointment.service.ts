import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationQueryDto } from '@common/dto/pagination-query.dto'
import { Repository } from 'typeorm'
import { Appointment } from '@entities/appointment.entity'
import { ScheduleService } from '@components/schedule/schedule.service'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { CreateAppointmentInput } from './dto/create-appointment.input'
import { UpdateAppointmentInput } from './dto/update-appointment.input'
import { User } from '@entities/user.entity'
import { Company } from '@entities/company.entity'

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly scheduleService: ScheduleService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery

    return this.appointmentRepository.find({
      relations: ['company', 'employeeCreated', 'employee', 'client'],
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
    })
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['company', 'employeeCreated', 'employee', 'client'],
    })

    if (!appointment) {
      throw new NotFoundException(
        `Appointment #${id} ${ApiHttpResponse.NOT_FOUND}`,
      )
    }

    return appointment
  }

  async create(createAppointmentInput: CreateAppointmentInput) {
    const client = await this.userRepository.findOneBy({
      id: createAppointmentInput.client,
    })
    const employee = await this.userRepository.findOneBy({
      id: createAppointmentInput.employee,
    })
    const employeeCreated = await this.userRepository.findOneBy({
      id: createAppointmentInput.employeeCreated,
    })
    const company = await this.companyRepository.findOneBy({
      id: createAppointmentInput.company,
    })

    if (!client || !employee || !employeeCreated || !company) {
      throw new NotFoundException('One or more related entities not found')
    }

    // Create appointment with resolved entities
    const appointment = this.appointmentRepository.create({
      client,
      employee,
      employeeCreated,
      company,
      startTime: createAppointmentInput.startTime,
      endTimeExpected: createAppointmentInput.endTimeExpected,
      endTime: createAppointmentInput.endTime,
      status: createAppointmentInput.status,
      canceled: createAppointmentInput.canceled || false,
    })

    // update employee schedule
    const schedule = {
      employee: appointment.employee,
      from: appointment.startTime,
      to: appointment.endTimeExpected,
    }

    const scheduled = await this.scheduleService.create(schedule)

    if (scheduled) {
      return this.appointmentRepository.save(appointment)
    }
  }

  async update(id: string, updateAppointmentInput: UpdateAppointmentInput) {
    // First fetch the existing appointment
    const existingAppointment = await this.findOne(id)

    // Prepare the update object
    const updateData: any = { id }

    // Copy simple properties
    if (updateAppointmentInput.startTime)
      updateData.startTime = updateAppointmentInput.startTime
    if (updateAppointmentInput.endTimeExpected)
      updateData.endTimeExpected = updateAppointmentInput.endTimeExpected
    if (updateAppointmentInput.endTime)
      updateData.endTime = updateAppointmentInput.endTime
    if (updateAppointmentInput.status)
      updateData.status = updateAppointmentInput.status
    if (updateAppointmentInput.canceled !== undefined)
      updateData.canceled = updateAppointmentInput.canceled

    // Fetch and set related entities if IDs are provided
    if (updateAppointmentInput.client) {
      const client = await this.userRepository.findOneBy({
        id: updateAppointmentInput.client,
      })
      if (client) updateData.client = client
    }

    if (updateAppointmentInput.employee) {
      const employee = await this.userRepository.findOneBy({
        id: updateAppointmentInput.employee,
      })
      if (employee) updateData.employee = employee
    }

    if (updateAppointmentInput.employeeCreated) {
      const employeeCreated = await this.userRepository.findOneBy({
        id: updateAppointmentInput.employeeCreated,
      })
      if (employeeCreated) updateData.employeeCreated = employeeCreated
    }

    if (updateAppointmentInput.company) {
      const company = await this.companyRepository.findOneBy({
        id: updateAppointmentInput.company,
      })
      if (company) updateData.company = company
    }

    // Preload with the properly structured data
    const appointment = await this.appointmentRepository.preload(updateData)

    if (!appointment) {
      throw new NotFoundException(
        `Appointment #${id} ${ApiHttpResponse.NOT_FOUND}`,
      )
    }

    return this.appointmentRepository.save(appointment)
  }

  async remove(id: string) {
    const appointment = await this.findOne(id)

    return this.appointmentRepository.remove(appointment)
  }
}
