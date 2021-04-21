import { Column, Entity, ManyToOne } from 'typeorm';

import { classToPlain } from 'class-transformer';

import { Abstract } from '@entities/abstract.entity';
import { Appointment } from '@entities/appointment.entity';
import { Service } from '@entities/service.entity';

@Entity('services_provided')
export class ServiceProvided extends Abstract {
  @ManyToOne(() => Appointment)
  appointment!: Appointment;

  @ManyToOne(() => Service)
  service!: Service;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  price!: number;

  toJson() {
    return classToPlain(this);
  }
}
