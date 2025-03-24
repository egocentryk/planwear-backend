import { Inject, Injectable, NotFoundException, Optional } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Article } from '@entities/article.entity'
import { Event } from '@entities/event.entity'
import { Photo } from '@entities/photo.entity'
import { Tag } from '@entities/tag.entity'
import { ApiHttpResponse } from '@enums/api-http-response.enum'
import { PaginationQueryDto } from '@common/dto/pagination-query.dto'
import { TwilioClient } from 'nestjs-twilio'

import articleConfig from './config/article.config'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { UploadArticlePhotoInput } from './dto/upload-article-photo.input'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly dataSource: DataSource,
    @Inject(articleConfig.KEY)
    private readonly articlesConfiguration: ConfigType<typeof articleConfig>,
    @Optional() private readonly twilioClient?: TwilioClient,
  ) {
    console.log(articlesConfiguration.foo)
  }

  async sendSMS() {
    if (!this.twilioClient) {
      return { error: 'Twilio client not available' }
    }

    try {
      return await this.twilioClient.messages.create({
        body: 'SMS Body',
        from: <string>process.env.TWILIO_PHONE_NUMBER,
        to: <string>process.env.TARGET_PHONE_NUMBER,
      })
    } catch (e) {
      return e
    }
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery

    return this.articleRepository.find({
      relations: ['tags', 'author'],
      skip: offset,
      take: limit,
      order: {
        id: order,
      },
    })
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['tags', 'author'],
    })

    if (!article) {
      throw new NotFoundException(`Article #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    return article
  }

  async create(createArticleInput: CreateArticleInput) {
    const tags: Tag[] = await Promise.all(
      createArticleInput.tags.map((title: string) =>
        this.preloadTagByName(title),
      ),
    )

    const article = this.articleRepository.create({
      ...createArticleInput,
      tags,
    })

    return this.articleRepository.save(article)
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    const tags =
      updateArticleInput.tags &&
      (await Promise.all(
        updateArticleInput.tags.map((title: string) =>
          this.preloadTagByName(title),
        ),
      ))

    const article = await this.articleRepository.preload({
      id: id,
      ...updateArticleInput,
      tags,
    })

    if (!article) {
      throw new NotFoundException(`Article #${id} ${ApiHttpResponse.NOT_FOUND}`)
    }

    await this.articleRepository.save(article)

    // Fetch the complete article with all relations for the GraphQL response
    return this.articleRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'tags', 'photos'],
    })
  }

  async remove(id: string) {
    const article = await this.findOne(id)

    return this.articleRepository.remove(article)
  }

  async recommendArticle(article: Article | any) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      article.recommendations++

      const recommendEvent = new Event()
      recommendEvent.name = 'recommend_article'
      recommendEvent.type = 'article'
      recommendEvent.payload = { articleId: article.id }

      await queryRunner.manager.save(article)
      await queryRunner.manager.save(recommendEvent)

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async preloadTagByName(title: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({ where: { title } })

    if (existingTag) {
      return existingTag
    }

    return this.tagRepository.create({ title })
  }

  async uploadArticlePhoto(uploadArticlePhotoInput: UploadArticlePhotoInput) {
    const { article: articleId, ...photoData } = uploadArticlePhotoInput

    const article = articleId
      ? await this.articleRepository.findOne({ where: { id: articleId } })
      : undefined

    const photo = this.photoRepository.create({
      ...photoData,
      ...(article ? { article } : {}),
    })

    return this.photoRepository.save(photo)
  }
}
