import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ArticleService } from './article.service'
import { Article } from '@entities/article.entity'
import { PaginationQueryInput } from '@common/dto/pagination-query.input'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { UploadArticlePhotoInput } from './dto/upload-article-photo.input'
import { UploadedFile } from '@nestjs/common'

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article], { name: 'articles' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryInput,
  ) {
    return this.articleService.findAll(paginationQueryInput)
  }

  @Query(() => Article, { name: 'article' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.articleService.findOne(id)
  }

  @Mutation(() => Article, { name: 'createArticle' })
  async create(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput)
  }

  @Mutation(() => Article, { name: 'updateArticle' })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(id, updateArticleInput)
  }

  @Mutation(() => Boolean, { name: 'removeArticle' })
  async remove(@Args('id') id: string) {
    await this.articleService.remove(id)

    return true
  }

  @Mutation(() => Boolean, { name: 'uploadArticlePhoto' })
  async uploadArticlePhoto(
    @Args('id') id: string,
    @Args('uploadArticlePhotoInput')
    uploadArticlePhotoInput: UploadArticlePhotoInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const photo = uploadArticlePhotoInput

    photo.article = id
    photo.filename = file.filename

    await this.articleService.uploadArticlePhoto(photo)

    return true
  }
}
