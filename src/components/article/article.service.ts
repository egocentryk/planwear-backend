import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  findAll() {
    return this.articleRepository.find();
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne(id);

    if (!article) {
      throw new NotFoundException(`Article #${id} not foundd`);
    }

    return article;
  }

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);

    return this.articleRepository.save(article);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.preload({
      id: +id,
      ...updateArticleDto,
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
}
