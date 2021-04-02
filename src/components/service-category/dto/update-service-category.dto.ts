import { PartialType } from '@nestjs/swagger';
import { CreateServiceCategoryDto } from './create-service-category.dto';

export class UpdateServiceCategoryDto extends PartialType(CreateServiceCategoryDto) {}
