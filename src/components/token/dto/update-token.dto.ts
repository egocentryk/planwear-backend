import { PartialType } from '@nestjs/swagger';
import { CreateTokenDto } from './create-token.dto';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {}
