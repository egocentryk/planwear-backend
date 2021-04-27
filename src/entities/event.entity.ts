import { Column, Entity } from 'typeorm';
import { Abstract } from '@entities/abstract.entity';

@Entity('events')
export class Event extends Abstract {
  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column('json')
  payload?: Record<string, any>;
}
