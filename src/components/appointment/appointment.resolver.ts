import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AppointmentService } from './appointment.service'
import { Appointment } from '@entities/appointment.entity'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateAppointmentInput } from './dto/create-appointment.input'
import { UpdateAppointmentInput } from './dto/update-appointment.input'

@Resolver()
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment], { name: 'appointments' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    return this.appointmentService.findAll(paginationQueryInput)
  }

  @Query(() => Appointment, { name: 'appointment' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.appointmentService.findOne(id)
  }

  @Mutation(() => Appointment, { name: 'createAppointment' })
  async create(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentService.create(createAppointmentInput)
  }

  @Mutation(() => Appointment, { name: 'updateAppointment' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ) {
    return this.appointmentService.update(id, updateAppointmentInput)
  }

  @Mutation(() => Appointment, { name: 'removeAppointment' })
  async remove(@Args('id') id: string) {
    return this.appointmentService.remove(id)
  }
}
