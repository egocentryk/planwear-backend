import { StatusUserInput } from './status-user.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateStatusUserInput extends PartialType(StatusUserInput) {}
