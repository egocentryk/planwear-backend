import { PartialType } from '@nestjs/graphql'
import { CreateServiceCategoryDto } from './create-service-category.dto'

export class UpdateServiceCategoryDto extends PartialType(
  CreateServiceCategoryDto,
) {}
