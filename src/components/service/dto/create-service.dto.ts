import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly company!: string;

  @IsString()
  readonly category?: string;

  @IsNumber()
  readonly price?: number;

  @IsInt()
  readonly duration?: number;
}
