import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.articleRepository.find({
      relations: ['tags', 'user'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne(id, {
      relations: ['tags', 'user']
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not foundd`);
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
      id: +id,
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

  private async preloadTagByName(title: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({ title });

    if (existingTag) {
      return existingTag;
    }

    return this.tagRepository.create({ title });
  }
}
