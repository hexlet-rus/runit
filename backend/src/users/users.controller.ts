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
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
import { RecoverUserDto } from './dto/recover-user.dto';

@ApiTags('users')
@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully returned all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully returned user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@UserDecorator('user') user: User) {
    return this.usersService.getData(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully returned user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':login')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully returned user by login' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findByLogin(@Param('login') login: string): Promise<User> {
    return this.usersService.findByLogin(login);
  }

  @Post()
  @UseFilters(new HttpValidationFilter())
  @ApiCreatedResponse({
    description:
      'Successfully created user and logged in! Token lasts 60 minutes!',
  })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  async create(@Body() createUserDto: CreateUserDto, @Response() res: any) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user, res);
  }

  @Post('recover')
  @UseFilters(new HttpValidationFilter())
  @ApiCreatedResponse({
    description: 'Successfully returned recovery hash key',
  })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  async recover(@Body() recoverUserDto: RecoverUserDto) {
    return this.usersService.recover(recoverUserDto);
  }

  @Get('recover/:hash')
  @UseFilters(new HttpValidationFilter())
  @ApiParam({ name: 'hash', description: 'Hash key for user recovery!' })
  @ApiOkResponse({ description: 'Successfully checked recovery hash key' })
  async checkHash(@Param('hash') hash: string) {
    return this.usersService.checkHash(hash);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpValidationFilter())
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully updated user' })
  @ApiBadRequestResponse({ description: 'Validation failed!' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ description: 'Successfully deleted user' })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
