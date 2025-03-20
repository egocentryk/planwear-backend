import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteResult {
  @Field(() => Boolean)
  success: boolean

  @Field(() => String, { nullable: true })
  message?: string

  @Field(() => String, { nullable: true })
  deletedId?: string
}
