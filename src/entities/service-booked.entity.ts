import {
  Column,
  Entity,
  ManyToOne
} from 'typeorm';

import {
  classToPlain
} from 'class-transformer';

import { Abstract } from './abstract.entity';
import { Appointment } from './appointment.entity';
import { Service } from './service.entity';

@Entity('services_booked')
export class ServiceBooked extends Abstract {
  @ManyToOne(() => Appointment)
  appointment: Appointment;

  @ManyToOne(() => Service)
  service: Service;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0
  })
  price: number;

  toJson() {
    return classToPlain(this);
  }
}
