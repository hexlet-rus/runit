/* eslint-disable class-methods-use-this */
import { join } from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import * as Sentry from '@sentry/node';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetsController } from './snippets/snippets.controller';
import { SnippetsModule } from './snippets/snippets.module';
import { SnippetsService } from './snippets/snippets.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import getDataSourceConfig from './config/data-source.config';
import { HttpsRedirectMiddleware } from './common/https.middleware';
import { EventsModule } from './events/events.module';
import { MailerConfig } from './config/mailer.config';
import getSentryConfig from './config/sentry.config';
import appConfig from './config/app.config';

import '@sentry/tracing';
import { RunnerModule } from './runner/runner.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend/build'),
    }),
    SnippetsModule,
    UsersModule,
    AuthModule,
    RunnerModule,
    EventsModule,
    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
    TypeOrmModule.forRoot(getDataSourceConfig()),
    SentryModule.forRoot(getSentryConfig()),
  ],
  controllers: [
    AppController,
    SnippetsController,
    UsersController,
    AuthController,
  ],

  providers: [AppService, SnippetsService, UsersService, AuthModule],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line no-useless-constructor
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(HttpsRedirectMiddleware).forRoutes('*');
  }
}
