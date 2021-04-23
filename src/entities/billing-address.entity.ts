import { Column, Entity, ManyToOne } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Abstract } from '@entities/abstract.entity';
import { Country } from '@entities/country.entity';
import { User } from '@entities/user.entity';

@Entity('billing-addresses')
export class BillingAddress extends Abstract {
  @ManyToOne(() => Country)
  country!: Country;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  @IsNotEmpty()
  city!: string;

  @Column()
  postal!: string;

  @Column()
  region?: string;

  @Column()
  state?: string;

  @Column()
  street!: Date;

  @Column({
    default: false,
  })
  isMainAddress?: boolean;

  toJson() {
    return classToPlain(this);
  }
}
