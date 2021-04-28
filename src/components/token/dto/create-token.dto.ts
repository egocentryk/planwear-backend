import { IsDate, IsString } from 'class-validator';
import { TokenType } from '@enums/token-type.enum';

export class CreateTokenDto {
  @IsString()
  readonly user!: string;

  @IsString()
  readonly token!: string;

  @IsString()
  readonly type!: TokenType;

  @IsDate()
  readonly validTo!: Date;
}
