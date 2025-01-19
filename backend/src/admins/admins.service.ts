/* eslint-disable no-useless-constructor */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';

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

  async updateUser(id: number, dto: any): Promise<User> {
    const user = await this.findOneUser(id);

    user.username = dto.username;
    user.email = dto.email;
    user.isAdmin = dto.isAdmin === 'on';
    await this.usersRepository.save(user);
    return user;
  }

  async create(createUserDto: any): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email.toLowerCase();
    user.password = createUserDto.password;
    user.isAdmin = createUserDto.isAdmin === 'on';
    const newUser = await this.usersRepository.save(user);
    const userSettings = await this.userSettingsRepository.create({
      userId: newUser.id,
      theme: 'system',
      language: 'ru',
      avatar_base64: null,
    });
    await this.userSettingsRepository.save(userSettings);
    return newUser;
  }

  async findAllSnippets(page: number, take: number): Promise<Snippet[]> {
    return this.snippetsRepository.find({
      skip: (page - 1) * take,
      take,
    });
  }

  async deleteSnippet(id: number): Promise<void> {
    await this.snippetsRepository.delete(id);
  }
}
