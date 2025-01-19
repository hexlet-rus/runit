/* eslint-disable import/no-import-module-exports */
import { join } from 'node:path';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { SentryFilter } from './filters/sentry.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    debug: process.env.DEBUG === 'true',
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  // app.useLogger(SentryService.SentryServiceInstance());

  app.setGlobalPrefix('api');
  app.enable('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use(cookieParser());
  app.use(json({ limit: '500kb' }));
  app.setBaseViewsDir(join(__dirname, 'admins/views'));
  app.setViewEngine('pug');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Run IT API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('users')
    .addTag('snippets')
    .addTag('auth')
    .addTag('common')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
