import { PartialType } from '@nestjs/graphql'
import { CreateArticleDto } from './create-article.dto'

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
