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
  Response,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserDecorator } from './users.decorator';
import { User } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpValidationFilter } from './exceptions/validation-exception.filter';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@UserDecorator('user') user: User) {
    return this.usersService.getData(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':login')
  async findByLogin(@Param('login') login: string): Promise<User> {
    return this.usersService.findByLogin(login);
  }

  @Post()
  @UseFilters(new HttpValidationFilter())
  async create(@Body() createUserDto: CreateUserDto, @Response() res: any) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user, res);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpValidationFilter())
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
