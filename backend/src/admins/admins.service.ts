/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';
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

  async findAllUsers(
    page: number,
    take: number,
    sortField: string,
    sortOrder: string,
    searchQuery: string,
  ): Promise<User[]> {
    const order = {};
    order[sortField] = sortOrder;
    return this.usersRepository.find({
      relations: {
        snippets: true,
      },
      where: [
        { username: Like(`%${searchQuery}%`) },
        { email: Like(`%${searchQuery}%`) },
      ],
      order,
      skip: (page - 1) * take,
      take,
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

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async updateUser(id: number, dto: any): Promise<void> {
    try {
      const user = await this.findOneUser(id);
      user.username = dto.username;
      user.email = dto.email;
      user.isAdmin = dto.isAdmin;
      await this.usersRepository.save(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(userId: number, updateDto: { isAdmin: boolean }): Promise<void> {
    await this.usersRepository.update(userId, updateDto);
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

  async getCurrentLang(userId: number): Promise<string> {
    const { language } = await this.userSettingsRepository.findOneBy({
      userId,
    });
    return language;
  }

  async validateDto(dto: UpdateUserDto): Promise<any> {
    const data = plainToInstance(UpdateUserDto, dto);
    const errors = await validate(data);
    if (errors.length > 0) {
      const formattedErrors = await this.formatErrors(errors);
      return { data, errors: { ...formattedErrors } };
    }
    return { data, errors: null };
  }

  async formatErrors(errors: ValidationError[]): Promise<any> {
    return errors.reduce((acc, err) => {
      acc[err.property] = { message: Object.values(err.constraints)[0] };
      return acc;
    }, {});
  }
}
