import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

import { ApiTags } from '@nestjs/swagger'
import { Public } from '../../common/decorators/public.decorator';
import { ParseStringPipe } from '../../common/pipes/parse-string.pipe';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.appointmentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseStringPipe) id: string) {
    return this.appointmentService.findOne(id);
  }
}
