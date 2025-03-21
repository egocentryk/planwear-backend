import { PartialType } from '@nestjs/graphql'
import { CreateServiceDto } from './create-service.dto'

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
