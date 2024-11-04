import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { SnippetSubscriber } from './snippets.subscriber';
import { UsersService } from '../users/users.service';
import { UserSettings } from 'src/entities/user-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet, User, UserSettings])],
  controllers: [SnippetsController],
  providers: [
    SnippetsService,
    SnippetSubscriber,
    UsersService,
    JwtService,
    AuthService,
  ],
  exports: [SnippetsService, TypeOrmModule],
})
export class SnippetsModule {}
