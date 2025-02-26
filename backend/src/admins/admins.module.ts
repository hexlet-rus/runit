/* eslint-disable class-methods-use-this */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';
import { MethodOverrideMiddleware } from './middleware/method-override.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Snippet, UserSettings])],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodOverrideMiddleware).forRoutes('*');
  }
}
