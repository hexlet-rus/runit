/* eslint-disable no-useless-constructor */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { User as UserDecorator } from '../users/users.decorator';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './interfaces/snippets.interface';
import { SnippetsService } from './snippets.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from './validation/validation.pipe';
import { User } from '../users/interfaces/users.interface';
import { 
  ApiBadRequestResponse,
  ApiCookieAuth, 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiParam, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';

@ApiTags('snippets')
@Controller('snippets')
@UseFilters(new HttpExceptionFilter())
export class SnippetsController {
  constructor(private snippetsService: SnippetsService) {}

  @Get()
  @ApiOkResponse({ description: 'Successfully returned all snippets' })
  async findAll(): Promise<Snippet[]> {
    return this.snippetsService.findAll();
  }

  @Get('name')
  @ApiOkResponse({ description: 'Successfully generated name for snippet'})
  async generateName(): Promise<string> {
    return this.snippetsService.generateName();
  }

  @Get(':login/:slug')
  @ApiParam({ name: 'login', description: 'User login' })
  @ApiParam({ name: 'slug', description: 'Snippet slug' })
  @ApiOkResponse({ description: 'Successfully returned snippet' })
  async findOneByLoginSlug(
    @Param('login') login: string,
    @Param('slug') slug: string,
  ): Promise<Snippet> {
    return this.snippetsService.findByLoginSlug(login, slug);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successfully returned snippet by id' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Snippet> {
    return this.snippetsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  @ApiCreatedResponse({ description: 'Snippet successfully created!' })
  async create(
    @UserDecorator('user') user: User,
    @Body(new ValidationPipe())
    createSnippetDto: CreateSnippetDto,
  ) {
    return this.snippetsService.create(createSnippetDto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  @ApiOkResponse({ description: 'Snippet successfully updated!' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Snippet successfully deleted!' })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.snippetsService.delete(id);
  }
}
