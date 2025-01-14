/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminsService {
  constructor(private readonly usersService: UsersService) {}

  findAllUsers(page: number, take: number): Promise<User[]> {
    return this.usersService.findAllUsers(page, take);
  }
}
