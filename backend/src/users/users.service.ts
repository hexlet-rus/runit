/* eslint-disable no-useless-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import { mkdirSync, openSync, appendFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../entities/user.entity';
import { Snippets } from '../entities/snippet.entity';
import { User } from './interfaces/users.interface';
import { RecoverUserDto } from './dto/recover-user.dto';
import { cipher, decipher } from './secure/cipher';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Snippets)
    private snippetsRepository: Repository<Snippets>,
    private readonly mailerService: MailerService,
    @InjectSentry() private readonly sentryService: SentryService,
  ) {}

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<Users> {
    return this.usersRepository.findOneBy({ username: ILike(username) });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ email });
  }

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.username = createUserDto.username;
    user.email = createUserDto.email.toLowerCase();
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const { ...data } = updateUserDto;
    const currentUser = await this.usersRepository.findOneBy({ id });
    const updatedUser = this.usersRepository.merge(currentUser, data);
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async recover({ email, frontendUrl }: RecoverUserDto): Promise<void> {
    const recoverHash = await cipher(email);
    const currentUser = await this.find(email);
    if (!currentUser) {
      return;
    }

    await this.usersRepository.update(currentUser.id, {
      recover_hash: recoverHash,
    });

    setTimeout(async () => {
      await this.usersRepository.update(currentUser.id, { recover_hash: null });
    }, 900000);

    // FIXME: use env var BASE_URL
    const url = `${frontendUrl}/recovery/${recoverHash}`;

    try {
      this.mailerService
        .sendMail({
          to: email,
          // FIXME: use i18n
          subject: 'Ссылка для изменения пароля на runit.hexlet.ru',
          template: 'recover',
          context: {
            url,
          },
        })
        .then((data) => {
          if (
            process.env.NODE_ENV !== 'production' &&
            !process.env.TRANSPORT_MAILER_URL
          ) {
            const logsDirName = process.env.LOGS_PATH ?? 'logs';
            mkdirSync(logsDirName, { recursive: true });
            openSync(`${logsDirName}/mail.log`, 'a');
            appendFileSync(`${logsDirName}/mail.log`, `${data.message}\n`);
          }
        })
        .catch((data) => {
          this.sentryService.debug(data.toString());
        });
    } catch (e) {
      console.log(`${e}`);
      this.sentryService.debug(e.toString());
      // throw new Error(e);
    }
  }

  async checkHash(hash: string): Promise<{ id: number | null }> {
    const email = await decipher(Buffer.from(hash, 'hex'));
    const currentUser = await this.find(email);

    if (currentUser && currentUser.recover_hash === hash) {
      return { id: currentUser.id };
    }
    return { id: null };
  }

  async resetPassword(
    { password }: UpdateUserDto,
    hash,
  ): Promise<{ id: number | null }> {
    const email = await decipher(Buffer.from(hash, 'hex'));
    const currentUser = await this.find(email);

    if (currentUser && currentUser.recover_hash === hash) {
      await this.usersRepository.update(currentUser.id, { recover_hash: null });
      await this.update(currentUser.id, { password });
      return currentUser;
    }
    return { id: null };
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
