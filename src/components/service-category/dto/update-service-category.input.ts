import { InputType, PartialType } from '@nestjs/graphql'
import { CreateServiceCategoryInput } from './create-service-category.input'

@InputType()
export class UpdateServiceCategoryInput extends PartialType(
  CreateServiceCategoryInput,
) {}
