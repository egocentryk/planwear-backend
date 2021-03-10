import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { Event } from '../../entities/event.entity';
import { Photo } from '../../entities/photo.entity';
import { Tag } from '../../entities/tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UploadArticlePhotoDTO } from './dto/upload-article-photo.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

import articleConfig from './config/article.config';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly connection: Connection,
    @Inject(articleConfig.KEY)
    private readonly articlesConfiguration: ConfigType<typeof articleConfig>,
    @InjectTwilio()
    private readonly twilioClient: TwilioClient,
  ) {
    console.log(articlesConfiguration.foo);
  }

  async sendSMS() {
    try {
      return await this.twilioClient.messages.create({
        body: 'SMS Body',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.TARGET_PHONE_NUMBER,
      });
    } catch (e) {
      return e;
    }
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order = 'DESC' } = paginationQuery;

    return this.articleRepository.find({
      relations: ['tags', 'user'],
      skip: offset,
      take: limit,
      order: {
        id: order,
      }
    });
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne(id, {
      relations: ['tags', 'user']
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const tags = await Promise.all(
      createArticleDto.tags.map(title => this.preloadTagByName(title)),
    );

    const article = this.articleRepository.create({
      ...createArticleDto,
      tags,
    });

    return this.articleRepository.save(article)
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const tags =
      updateArticleDto.tags &&
      (await Promise.all(
        updateArticleDto.tags.map(title => this.preloadTagByName(title)),
      ));

    const article = await this.articleRepository.preload({
      id: id,
      ...updateArticleDto,
      tags,
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return this.articleRepository.save(article);
  }

  async remove(id: string) {
    const article = await this.findOne(id);

    return this.articleRepository.remove(article);
  }

  async recommendArticle(article: Article) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      article.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_article';
      recommendEvent.type = 'article';
      recommendEvent.payload = { articleId: article.id };

      await queryRunner.manager.save(article);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadTagByName(title: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({ title });

    if (existingTag) {
      return existingTag;
    }

    return this.tagRepository.create({ title });
  }

  uploadArticlePhoto(uploadArticlePhotoDto: UploadArticlePhotoDTO) {
    const photo = this.photoRepository.create(uploadArticlePhotoDto);

    return this.photoRepository.save(photo);
  }
}
