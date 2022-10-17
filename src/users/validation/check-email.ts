/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CheckEmail implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const email = validationArguments.value;
    const exists = await this.usersService.find(email);
    return !exists;
  }
}
