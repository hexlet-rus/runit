/* eslint-disable no-useless-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../entities/user.entity';
import { Snippets } from '../entities/snippet.entity';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Snippets)
    private snippetsRepository: Repository<Snippets>,
  ) {}

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByLogin(login: string): Promise<Users> {
    return this.usersRepository.findOneBy({ login });
  }

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.login = createUserDto.login;
    user.email = createUserDto.email.toLowerCase();
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const { currPassword, confirmPassword, ...data } = updateUserDto;
    const currentUser = await this.usersRepository.findOneBy({ id });
    const updatedUser = this.usersRepository.merge(currentUser, data);
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getData({ id }: User): Promise<any> {
    const currentUser = await this.usersRepository.findOneBy({ id });
    const snippets = await this.snippetsRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id,
        },
      },
    });
    return { currentUser, snippets };
  }
}
