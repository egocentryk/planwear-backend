import { InputType, PartialType } from '@nestjs/graphql'
import { CreateCompanyInput } from './create-company.input'

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}
