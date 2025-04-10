/* eslint-disable no-useless-constructor */

import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Redirect,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Snippet } from '../entities/snippet.entity';
import { User } from '../entities/user.entity';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import routes from './routes';
import { HttpExceptionFilter } from './exceptions/http-exceptions.filter';

@UseGuards(JwtAuthGuard, RoleGuard)
@UseFilters(HttpExceptionFilter)
@Controller('admin')
@Role(UserRole.Admin)
export class UsersController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('users')
  @Render('users.pug')
  async findAllUsers(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('sort') sortField = 'id',
    @Query('order') sortOrder = 'asc',
    @Query('search') searchQuery = '',
  ): Promise<any> {
    const request = req as Request & {
      flash: (type: string, message?: string) => any;
      user: User;
    };
    const currentUser = request.user;
    const currentLang = await this.adminsService.getCurrentLang(currentUser.id);
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const take = 10;
    const users: User[] = await this.adminsService.findAllUsers(page, take);
    return {
      searchQuery,
      frontendUrl,
      users,
      currentPage: page,
      routes,
      currentLang,
      message: request.flash('success'),
    };
  }

  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatedUserDto: any,
    @Res() res: Response,
    @Req() req: Request,
    @I18n() i18n: I18nContext,
  ): Promise<any> {
    const request = req as Request & {
      flash: (type: string, message?: string) => any;
      user: User;
    };
    const currentUser = request.user;
    const currentLang = await this.adminsService.getCurrentLang(currentUser.id);
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const updateUserDto = { ...updatedUserDto, id: userId };
    const validateDto = await this.adminsService.validateDto(updateUserDto);
    if (validateDto.errors) {
      res.status(422).render('edit-user.pug', {
        status: 'validationFailed',
        errors: validateDto.errors,
        updateUserDto: validateDto.data,
        routes,
        currentLang,
        frontendUrl,
      });
    } else {
      await this.adminsService.updateUser(userId, validateDto.data);
      request.flash(
        'success',
        `${i18n.t('templates.users.success', { lang: currentLang })}`,
      );
      res.redirect('/admin/users');
    }
  }

  @Get('users/:id')
  @Render('edit-user.pug')
  async editUser(
    @Param('id', ParseIntPipe) userId: number,
    @Req() req: any,
  ): Promise<any> {
    const currentUser = req.user;
    const currentLang = await this.adminsService.getCurrentLang(currentUser.id);
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const user: User = await this.adminsService.findOneUser(userId);
    return {
      status: null,
      errors: null,
      updateUserDto: user,
      routes,
      currentLang,
      frontendUrl,
    };
  }

  @Get('users/:id/snippets')
  @Render('snippets.pug')
  async findAllSnippetsUser(
    @Param('id', ParseIntPipe) userId: number,
    @Req() req: any,
  ): Promise<{
    snippets: Snippet[];
    userId: number;
    routes: typeof routes;
    currentLang: string;
    frontendUrl: string;
  }> {
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    const currentUser = req.user;
    const currentLang = await this.adminsService.getCurrentLang(currentUser.id);
    const snippets: Snippet[] =
      await this.adminsService.findAllSnippetsUser(userId);
    return { snippets, userId, routes, currentLang, frontendUrl };
  }

  @Delete('users/:id')
  @Redirect('/admin/users')
  deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {
    return this.adminsService.deleteUser(userId);
  }

  @Delete('users/:userId/snippets/:snippetId')
  async deleteUserSnippet(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('snippetId', ParseIntPipe) snippetId: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.adminsService.deleteUserSnippet(userId, snippetId);
    const currentUrl = routes.getUserSnippetsPath(userId);
    res.redirect(currentUrl);
  }
}
