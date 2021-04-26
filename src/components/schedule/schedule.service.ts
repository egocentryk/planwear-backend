import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '@entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiHttpResponse } from '@enums/api-http-response.enum';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  findAll() {
    return this.scheduleRepository.find();
  }

  async findOne(id: string) {
    const schedule = await this.scheduleRepository.findOne(id);

    if (!schedule) {
      throw new NotFoundException(
        `Schedule #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return schedule;
  }

  create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);

    return this.scheduleRepository.save(schedule);
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.preload({
      id: id,
      ...updateScheduleDto,
    });

    if (!schedule) {
      throw new NotFoundException(
        `Schedule #${id} ${ApiHttpResponse.NOT_FOUND}`,
      );
    }

    return this.scheduleRepository.save(schedule);
  }

  async remove(id: string) {
    const schedule = await this.findOne(id);

    return this.scheduleRepository.remove(schedule);
  }
}
