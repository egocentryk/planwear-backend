import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServiceController {}
