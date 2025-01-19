import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Snippet, UserSettings])],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
