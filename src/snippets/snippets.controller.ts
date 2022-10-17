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

@Controller('snippets')
@UseFilters(new HttpExceptionFilter())
export class SnippetsController {
  constructor(private snippetsService: SnippetsService) {}

  @Get()
  async findAll(): Promise<Snippet[]> {
    return this.snippetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Snippet> {
    return this.snippetsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @UserDecorator('user') user: User,
    @Body(new ValidationPipe())
    createSnippetDto: CreateSnippetDto,
  ) {
    return this.snippetsService.create(createSnippetDto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.snippetsService.delete(id);
  }
}
