/* eslint-disable no-useless-constructor */

import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { Snippet } from '../entities/snippet.entity';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return { users, currentPage: page, activeTemplate: 'users' };
  }

  /* eslint-disable class-methods-use-this */
  @Get('users/create')
  @Render('create-user.pug')
  /* eslint-disable @typescript-eslint/no-empty-function */
  create() {}

  @Post('users/create')
  @Redirect('/api/admin/users')
  createUser(@Body() dto: any): Promise<any> {
    return this.adminsService.create(dto);
  }

  @Get('users/delete/:id')
  @Redirect('/api/admin/users')
  deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {
    return this.adminsService.deleteUser(userId);
  }

  @Get('users/edit/:id')
  @Render('edit-user.pug')
  async editUser(@Param('id', ParseIntPipe) userId: number) {
    const user: User = await this.adminsService.findOneUser(userId);
    return { user };
  }

  @Post('users/edit/:id')
  @Redirect('/api/admin/users')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<any> {
    return this.adminsService.updateUser(userId, dto);
  }

  @Get('snippets')
  @Render('snippets.pug')
  async findAllSnippets(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ): Promise<any> {
    const take = 10;
    const snippets: Snippet[] = await this.adminsService.findAllSnippets(
      page,
      take,
    );
    return { snippets, currentPage: page, activeTemplate: 'snippets' };
  }

  @Get('snippets/delete/:id')
  @Redirect('/api/admin/snippets')
  deleteSnippet(@Param('id', ParseIntPipe) snippetId: number): Promise<void> {
    return this.adminsService.deleteSnippet(snippetId);
  }
}
