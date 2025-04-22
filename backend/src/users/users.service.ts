/* eslint-disable no-useless-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import { mkdirSync, openSync, appendFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Snippet } from '../entities/snippet.entity';
import { UserSettings } from '../entities/user-settings.entity';
import { IUser } from './interfaces/users.interface';
import { RecoverUserDto } from './dto/recover-user.dto';
import { cipher, decipher } from './secure/cipher';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
    private readonly mailerService: MailerService,
    @InjectSentry() private readonly sentryService: SentryService,
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: ILike(username) });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email.toLowerCase();
    user.password = createUserDto.password;
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const data = { ...updateUserDto, email: updateUserDto.email.toLowerCase() };
    const currentUser = await this.usersRepository.findOneBy({ id });
    const settings = await this.userSettingsRepository.findOneBy({
      userId: id,
    });
    const updatedUser = this.usersRepository.merge(currentUser, data);
    await this.usersRepository.save(updatedUser);

    return {
      ...updatedUser,
      language: settings.language,
      theme: settings.theme,
      avatar_base64: settings.avatar_base64,
    };
  }

  async updateSettings(
    id: number,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<any> {
    const { ...data } = updateUserSettingsDto;
    const currentSettings = await this.userSettingsRepository.findOneBy({
      userId: id,
    });
    const currentUser = await this.usersRepository.findOneBy({ id });
    const updateSettings = await this.userSettingsRepository.merge(
      currentSettings,
      data,
    );
    await this.userSettingsRepository.save(updateSettings);
    return {
      ...currentUser,
      language: updateSettings.language,
      theme: updateSettings.theme,
      avatar_base64: updateSettings.avatar_base64,
    };
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
      this.sentryService.debug(e.toString());
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
    await this.snippetsRepository.delete({ userId: id });
    await this.userSettingsRepository.delete({ userId: id });
    await this.usersRepository.delete({ id });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getData({ id }: IUser): Promise<any> {
    const currentUser = await this.usersRepository.findOneBy({ id });
    const settingsUser = await this.userSettingsRepository.findOne({
      where: { userId: id },
    });
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
    if (!settingsUser) {
      const createSettingsUser = this.userSettingsRepository.create({
        userId: id,
        theme: 'system',
        language: 'ru',
        avatar_base64: null,
      });
      await this.userSettingsRepository.save(createSettingsUser);
    }
    const settings = await this.userSettingsRepository.findOne({
      where: { userId: id },
    });
    const data = {
      ...currentUser,
      language: settings.language,
      theme: settings.theme,
      avatar_base64: settings.avatar_base64,
    };
    return { currentUser: data, snippets };
  }
}
