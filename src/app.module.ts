import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TwilioModule } from 'nestjs-twilio'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AppointmentModule } from '@components/appointment/appointment.module'
import { ArticleModule } from '@components/article/article.module'
// import { CommonModule } from '@common/common.module'
import { CompanyModule } from '@components/company/company.module'
import { UserModule } from '@components/user/user.module'
import { ServiceCategoryModule } from '@components/service-category/service-category.module'
import { ServiceModule } from '@components/service/service.module'

import appConfig from '@config/app.config'

import * as Joi from 'joi'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { TokenModule } from './components/token/token.module'
import { User } from '@entities/user.entity'
import { Token } from '@entities/token.entity'

const ssl: {
  [key: string]: boolean
} = {
  development: false,
  production: true,
}

const sslOptions: {
  [key: string]: any
} = {
  development: {},
  production: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}

interface OriginalError {
  message: string
}

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [User, Token], // Include all related types
      },
      formatError: (error) => {
        const originalError = error.extensions?.originalError as OriginalError

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          }
        }

        return {
          message: originalError.message,
          code: error.extensions?.message,
        }
      },
    }),
    TwilioModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        // url: configService.get('DATABASE_URL'),
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: true /* development mode ONLY!!! */,
        ssl: ssl[configService.get('NODE_ENV')],
        extra: sslOptions[configService.get('NODE_ENV')],
      }),
      inject: [ConfigService],
    }),
    AppointmentModule,
    ArticleModule,
    CompanyModule,
    // CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        TYPEORM_HOST: Joi.required(),
        TYPEORM_PORT: Joi.number().default(5432),
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'staging',
          'test',
        ),
      }),
    }),
    MulterModule.register({
      dest: './src/files',
    }),
    UserModule,
    ServiceCategoryModule,
    ServiceModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
