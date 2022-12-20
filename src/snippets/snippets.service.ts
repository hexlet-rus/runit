/* eslint-disable no-useless-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as path from 'path';
import { Users } from '../entities/user.entity';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippets } from '../entities/snippet.entity';
import { User } from '../users/interfaces/users.interface';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectEntityManager()
    private snippetManager: EntityManager,
    @InjectRepository(Snippets)
    private snippetsRepository: Repository<Snippets>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(id: number): Promise<Snippets> {
    return this.snippetsRepository.findOneBy({ id });
  }

  async getSlug(name: string, login: string, id: number): Promise<string> {
    const trimmedName = name.trim();
    const extension = path.extname(trimmedName);
    const basename = path.basename(trimmedName, extension);
    const slug = `${basename
      .replace(/\s/g, '-')
      .toLowerCase()}_${extension.slice(1)}`;
    const snippets = await this.snippetManager
      .createQueryBuilder(Snippets, 'snippet')
      .where('snippet.userId= :id', { id })
      .getMany();
    const isUniqAmongUserSnippets = !snippets.find(
      (snippet) => snippet.slug === slug,
    );
    return `${slug}${
      isUniqAmongUserSnippets ? '' : `_${new Date().getTime()}`
    }`;
  }

  async create(
    createSnippetDto: CreateSnippetDto,
    { id }: User,
  ): Promise<Snippets> {
    const snippet = new Snippets();
    const { name, code } = createSnippetDto;
    const user = await this.usersRepository.findOneBy({ id });
    snippet.slug = await this.getSlug(name, user.login, id);
    snippet.name = name;
    snippet.user = user;
    snippet.code = code;
    return this.snippetsRepository.save(snippet);
  }

  async update(
    id: number,
    user: User,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippets> {
    const { login } = user;
    updateSnippetDto.slug = await this.getSlug(
      updateSnippetDto.name,
      login,
      user.id,
    );
    await this.snippetsRepository.update(id, updateSnippetDto);
    return this.snippetsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.snippetsRepository.delete(id);
  }

  findAll(): Promise<Snippets[]> {
    return this.snippetsRepository.find();
  }
}
