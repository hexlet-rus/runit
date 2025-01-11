import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

@Module({
  imports: [UsersModule],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}
