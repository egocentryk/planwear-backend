import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UploadArticlePhotoInput {
  @Field(() => String)
  @IsString()
  title!: string

  @Field(() => String)
  @IsString()
  author!: string

  @Field(() => String)
  @IsNotEmpty()
  article!: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  filename!: string
}
