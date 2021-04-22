import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '@entities/article.entity';
import { Tag } from '@entities/tag.entity';
import { Connection, Repository } from 'typeorm';
import { ArticleService } from './article.service';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('ArticleService', () => {
  let service: ArticleService;
  let articleRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Article),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<MockRepository>(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when article with ID exists in database', () => {
      it('shoud return the article object', async () => {
        const articleId = '1';
        const expectedArticle = {};

        articleRepository?.findOne?.mockReturnValue(expectedArticle);
        const article = await service.findOne(articleId);
        expect(article).toEqual(expectedArticle);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const articleId = '1';
        articleRepository?.findOne?.mockReturnValue(undefined);

        try {
          await service.findOne(articleId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Article #${articleId} not found`);
        }
      });
    });
  });
});
