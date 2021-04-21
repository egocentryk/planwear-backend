import { Column, Entity, ManyToOne } from 'typeorm';

import { classToPlain } from 'class-transformer';

import { Abstract } from '@entities/abstract.entity';
import { User } from '@entities/user.entity';

/*
  one of the most crucial table in our database,
  we must know exactly when each employee is available
*/
@Entity('schedules')
export class Schedule extends Abstract {
  @ManyToOne(() => User)
  employee!: User;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  from!: Date;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  to!: Date;

  toJson() {
    return classToPlain(this);
  }
}
