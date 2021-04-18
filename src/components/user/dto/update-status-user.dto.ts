import { PartialType } from '@nestjs/swagger';
import { StatusUserDto } from './status-user.dto';

export class UpdateStatusUserDto extends PartialType(StatusUserDto) {}
