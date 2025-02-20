/* eslint-disable no-useless-constructor */

import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Snippet } from '../entities/snippet.entity';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('admin')
@Role('admin')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('users')
  @Render('users.pug')
  async findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ): Promise<{
    frontendUrl: string;
    users: User[];
    currentPage: number;
    activeTemplate: string;
  }> {
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const take = 10;
    const users: User[] = await this.adminsService.findAllUsers(page, take);
    return {
      frontendUrl,
      users,
      currentPage: page,
      activeTemplate: 'users',
    };
  }

  /* eslint-disable class-methods-use-this */
  @Get('users/create')
  @Render('create-user.pug')
  /* eslint-disable @typescript-eslint/no-empty-function */
  create(): void {
    // No data to pass to the template
  }

  @Post('users/create')
  @Render('create-user.pug')
  async createUser(
    @Body()
    createUserDto: any,
  ): Promise<any> {
    const errors =
      await this.adminsService.formatValidationErrors(createUserDto);
    if (errors) {
      return { status: 'validationFailed', ...errors, createUserDto };
    }
    return this.adminsService.create(createUserDto);
  }

  @Delete('users/delete/:id')
  @Redirect('/api/admin/users')
  deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {
    return this.adminsService.deleteUser(userId);
  }

  @Get('users/edit/:id')
  @Render('edit-user.pug')
  async editUser(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    const user: User = await this.adminsService.findOneUser(userId);
    return { status: null, errors: null, updateUserDto: user };
  }

  @Post('users/edit/:id')
  @Render('edit-user.pug')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatedUserDto: any,
  ): Promise<any> {
    const updateUserDto = { ...updatedUserDto, id: userId };
    const errors =
      await this.adminsService.formatValidationErrors(updateUserDto);
    if (errors) {
      return { status: 'validationFailed', ...errors, updateUserDto };
    }
    return this.adminsService.updateUser(userId, updateUserDto);
  }

  @Get('users/:id/snippets')
  @Render('snippets.pug')
  async findAllSnippetsUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<{ snippets: Snippet[]; userId: number; activeTemplate: string }> {
    const snippets: Snippet[] =
      await this.adminsService.findAllSnippetsUser(userId);
    return { snippets, userId, activeTemplate: 'snippets' };
  }

  @Get('snippets')
  @Render('snippets.pug')
  async findAllSnippets(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ): Promise<{
    frontendUrl: string;
    snippets: Snippet[];
    currentPage: number;
    activeTemplate: string;
  }> {
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const take = 10;
    const snippets: Snippet[] = await this.adminsService.findAllSnippets(
      page,
      take,
    );
    return {
      frontendUrl,
      snippets,
      currentPage: page,
      activeTemplate: 'snippets',
    };
  }

  @Delete('snippets/delete/:id')
  @Redirect('/api/admin/snippets')
  deleteSnippet(@Param('id', ParseIntPipe) snippetId: number): Promise<void> {
    return this.adminsService.deleteSnippet(snippetId);
  }

  @Delete('users/:userId/snippets/delete/:snippetId')
  async deleteUserSnippet(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('snippetId', ParseIntPipe) snippetId: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.adminsService.deleteUserSnippet(userId, snippetId);
    const currentUrl = `/api/admin/users/${userId}/snippets`;
    res.redirect(currentUrl);
  }
}
