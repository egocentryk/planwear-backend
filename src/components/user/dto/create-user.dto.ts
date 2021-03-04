import {
  IsEmail,
  IsString
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}