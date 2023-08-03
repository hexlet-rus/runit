/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/en';
import { Users } from '../entities/user.entity';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippets } from '../entities/snippet.entity';
import { User } from '../users/interfaces/users.interface';
import { generateUniqSlug } from './utils/generate-uniq-slug';

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

  async findByUsernameSlug(username: string, slug: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username });
    const snippet = await this.snippetsRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        slug,
      },
    });
    return snippet;
  }

  async getSlug(id: number): Promise<string> {
    const snippets = await this.snippetManager
      .createQueryBuilder(Snippets, 'snippet')
      .where('snippet.userId= :id', { id })
      .getMany();
    return generateUniqSlug(snippets);
  }

  async create(
    createSnippetDto: CreateSnippetDto,
    { id }: User,
  ): Promise<Snippets> {
    const snippet = new Snippets();
    const { name, code } = createSnippetDto;
    const user = await this.usersRepository.findOneBy({ id });
    snippet.slug = await this.getSlug(id);
    snippet.name = name;
    snippet.user = user;
    snippet.code = code;
    return this.snippetsRepository.save(snippet);
  }

  async update(
    id: number,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippets> {
    await this.snippetsRepository.update(id, updateSnippetDto);
    return this.snippetsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.snippetsRepository.delete(id);
  }

  findAll(): Promise<Snippets[]> {
    return this.snippetsRepository.find();
  }

  generateName(): string {
    const adjectiveLength = 3 + Math.round(Math.random() * 6);
    const adjective = faker.word.adjective(adjectiveLength);
    const animal = faker.animal.type();
    return `${adjective}-${animal}`;
  }
}
