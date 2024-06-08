import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../entities/snippet.entity';
import { AuthService } from '../auth/auth.service';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSubscriber } from './users.subscriber';
import { CheckEmail } from './validation/check-email';
import { CheckUsername } from './validation/check-username';
import { CheckPassword } from './validation/check-password';

@Module({
  imports: [TypeOrmModule.forFeature([User, Snippet])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersSubscriber,
    AuthService,
    JwtService,
    CheckEmail,
    CheckUsername,
    CheckPassword,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
