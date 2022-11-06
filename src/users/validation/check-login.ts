/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'login', async: true })
@Injectable()
export class CheckLogin implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const login = validationArguments.value;
    const exists = await this.usersService.findByLogin(login);
    return !exists;
  }
}
