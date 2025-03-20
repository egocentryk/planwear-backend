import { Column, Entity, ManyToOne } from 'typeorm'
import { classToPlain, instanceToPlain } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Abstract } from '@entities/abstract.entity'
import { Country } from '@entities/country.entity'
import { User } from '@entities/user.entity'
import { ObjectType } from '@nestjs/graphql'

@Entity('billing_addresses')
@ObjectType()
export class BillingAddress extends Abstract {
  @ManyToOne(() => Country)
  country!: Country

  @ManyToOne(() => User)
  user!: User

  @Column()
  @IsNotEmpty()
  city!: string

  @Column()
  postal!: string

  @Column()
  region?: string

  @Column()
  state?: string

  @Column()
  street!: Date

  @Column({
    default: false,
  })
  isMainAddress?: boolean

  toJson() {
    return instanceToPlain(this)
  }
}
