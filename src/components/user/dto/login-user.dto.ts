import {
  IsEmail,
  IsOptional,
  IsString
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;

  @IsOptional()
  @IsString()
  readonly token?: string;
}
