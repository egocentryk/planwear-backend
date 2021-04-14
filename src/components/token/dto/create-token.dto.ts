import { TokenType } from '@entities/token.entity';
import { IsDate, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  readonly user: string | any;

  @IsString()
  readonly token: string;

  @IsString()
  readonly type: TokenType;

  @IsDate()
  readonly validTo: Date;
}
