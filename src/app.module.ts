import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './components/company/company.module';
import { ArticleModule } from './components/article/article.module';
import { CommonModule } from './common/common.module';

import appConfig from './config/app.config';

import * as Joi from '@hapi/joi';

const ssl = {
  development: false,
  production: true
}

const sslOptions = {
  development: {},
  production: {
    ssl: {
      rejectUnauthorized: false
    }
  },
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DATABASE_URL'),
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: ssl[configService.get('NODE_ENV')],
        extra: sslOptions[configService.get('NODE_ENV')],
      }),
      inject: [ConfigService],
    }),
    ArticleModule,
    CompanyModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging', 'test'),
      }),
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
