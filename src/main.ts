import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { WrapResponseInterceptor } from '@interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from '@interceptors/timeout.interceptor';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('PlanWEAR')
    .setDescription('PlanWEAR application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor()
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
