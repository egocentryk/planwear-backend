import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './components/company/company.module';
import { ArticleModule } from './components/article/article.module';

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
      useFactory: () => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
        ssl: ssl[process.env.NODE_ENV],
        extra: sslOptions[process.env.NODE_ENV],
      }),
    }),
    ArticleModule,
    CompanyModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
