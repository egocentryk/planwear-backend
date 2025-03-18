import { InputType, PartialType } from '@nestjs/graphql'
import { CreateTokenInput } from './create-token.input'

@InputType()
export class UpdateTokenInput extends PartialType(CreateTokenInput) {}
