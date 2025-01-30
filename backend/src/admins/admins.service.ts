/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
  ) {}

  async findAllUsers(page: number, take: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: (page - 1) * take,
      take,
      relations: {
        snippets: true,
      },
    });
  }

  async findAllSnippetsUser(id: number): Promise<Snippet[]> {
    return this.snippetsRepository.find({
      where: {
        userId: id,
      },
      relations: {
        user: true,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.snippetsRepository.delete({ userId: id });
    await this.userSettingsRepository.delete({ userId: id });
    await this.usersRepository.delete({ id });
  }

  async findOneUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    dto: any,
  ): Promise<{
    status: string;
    errors: null | string;
    updateUserDto: CreateUserDto;
  }> {
    try {
      const user = await this.findOneUser(id);
      user.username = dto.username;
      user.email = dto.email;
      user.isAdmin = dto.isAdmin === 'on';
      await this.usersRepository.save(user);
      return { status: 'success', errors: null, updateUserDto: dto };
    } catch (e) {
      return { status: 'failed', errors: e.message, updateUserDto: dto };
    }
  }

  async create(dto: CreateUserDto): Promise<{
    status: string;
    errors: null | string;
    createUserDto: CreateUserDto;
  }> {
    try {
      const user = new User();
      user.username = dto.username;
      user.email = dto.email.toLowerCase();
      user.password = dto.password;
      user.isAdmin = dto.isAdmin === 'on';
      const newUser = await this.usersRepository.save(user);
      const userSettings = await this.userSettingsRepository.create({
        userId: newUser.id,
        theme: 'system',
        language: 'ru',
        avatar_base64: null,
      });
      await this.userSettingsRepository.save(userSettings);
      return { status: 'success', errors: null, createUserDto: dto };
    } catch (e) {
      return { status: 'failed', errors: e.message, createUserDto: dto };
    }
  }

  async findAllSnippets(page: number, take: number): Promise<Snippet[]> {
    return this.snippetsRepository.find({
      skip: (page - 1) * take,
      take,
      relations: {
        user: true,
      },
    });
  }

  async deleteSnippet(id: number): Promise<void> {
    await this.snippetsRepository.delete(id);
  }

  async deleteUserSnippet(userid: number, snippetId: number): Promise<void> {
    await this.snippetsRepository.delete({ id: snippetId, userId: userid });
  }

  // eslint-disable-next-line class-methods-use-this
  async formatValidationErrors(
    dto: CreateUserDto | UpdateUserDto,
  ): Promise<any> {
    let data;
    if ('password' in dto) {
      data = plainToInstance(CreateUserDto, dto);
    } else {
      data = plainToInstance(UpdateUserDto, dto);
    }
    const errors = await validate(data);
    if (errors.length > 0) {
      const formattedErrors = errors.reduce((acc, err) => {
        acc[err.property] = { message: Object.values(err.constraints)[0] };
        return acc;
      }, {});
      return { errors: { ...formattedErrors } };
    }
    return null;
  }
}
