/* eslint-disable dot-notation */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'username', async: true })
@Injectable()
export class CheckUsername implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const username = validationArguments.value;
    const { object } = validationArguments;
    const exists = await this.usersService.findByUsername(username);
    if (object['id'] && exists) {
      return exists.id === object['id'];
    }
    return !exists;
  }
}
