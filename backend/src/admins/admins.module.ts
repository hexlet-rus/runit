/* eslint-disable class-methods-use-this */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { AdminsService } from './admins.service';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';
import { MethodOverrideMiddleware } from './middleware/method-override.middleware';
import { UsersController } from './users.controller';
import { SnippetsController } from './snippets.controller';
import { i18nConfig } from '../config/i18n.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Snippet, UserSettings]),
    I18nModule.forRoot(i18nConfig),
  ],
  providers: [AdminsService],
  controllers: [UsersController, SnippetsController],
})
export class AdminsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('admin');
  }
}
