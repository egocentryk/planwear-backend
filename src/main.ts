import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { HttpExceptionFilter } from '@filters/http-exception.filter'
import { WrapResponseInterceptor } from '@interceptors/wrap-response.interceptor'
import { TimeoutInterceptor } from '@interceptors/timeout.interceptor'

import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  app.setGlobalPrefix('api/v1')

  app.use(cookieParser())
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalInterceptors(
  //   new WrapResponseInterceptor(),
  //   new TimeoutInterceptor(),
  // )

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
