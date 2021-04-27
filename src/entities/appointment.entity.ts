import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from '@entities/abstract.entity';
import { Company } from '@entities/company.entity';
import { User } from '@entities/user.entity';
import { AppointmentStatus } from '@enums/appointment-status.enum';

@Entity('appointments')
export class Appointment extends Abstract {
  @ManyToOne(() => User)
  employeeCreated!: User;

  @ManyToOne(() => User)
  employee!: User;

  @ManyToOne(() => User)
  client!: User;

  @ManyToOne(() => Company)
  company!: Company;

  @Column({
    default: AppointmentStatus.PENDING,
    enum: AppointmentStatus,
    type: 'enum',
  })
  status?: AppointmentStatus;

  @Column('timestamp')
  startTime!: Date;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  endTimeExpected!: Date;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  endTime?: Date;

  // this is the sum off all the booked services prices
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceExpected!: number;

  /*
    sum of all provided services, it can differ from priceExpected.
    Client may changed their mind or added a service.
    Price of the service could also change between the booking time
    and the time service was provided.
  */
  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceFull?: number;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  discount?: number;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    default: 0,
  })
  priceFinal?: number;

  @Column('bool', {
    nullable: true,
  })
  canceled?: boolean;

  @Column({
    nullable: true,
  })
  cancelationReason?: string;
}
