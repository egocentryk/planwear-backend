import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { CreateArticleDto } from '../../src/components/article/dto/create-article.dto';

describe('[Feature] Articles - /articles', () => {
  // mock createArticleDTO
  const article = {
    title: 'Custom Example test module article title',
    content: 'Test Article content...',
    author: '1497d0ad-1940-4c3e-81aa-c94f07e3442d',
    tags: ['nestjs', 'is', 'fucking', 'awesome'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRoot({})],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/articles')
      .set('ApiGuard', <string>process.env.API_KEY)
      .send(article as CreateArticleDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedArticle = jasmine.objectContaining({
          ...article,
          tags: jasmine.arrayContaining(
            article.tags.map((title) => jasmine.objectContaining({ title })),
          ),
        });
        expect(body).toEqual(expectedArticle);
      });
  });
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
