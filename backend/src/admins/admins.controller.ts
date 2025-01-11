/* eslint-disable no-useless-constructor */

import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('users')
  @Render('users.pug')
  async findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ) {
    const take = 10;
    const users: User[] = await this.adminsService.findAllUsers(page, take);
    return { users, currentPage: page };
  }
}
