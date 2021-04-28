import { Column, Entity, ManyToOne } from 'typeorm';
import { Abstract } from '@entities/abstract.entity';
import { User } from '@entities/user.entity';
import { TokenType } from '@enums/token-type.enum';

@Entity('tokens')
export class Token extends Abstract {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  token!: string;

  @Column({
    enum: TokenType,
    nullable: true,
    type: 'enum',
  })
  type!: TokenType;

  @Column()
  validTo!: Date;
}
