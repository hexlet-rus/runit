/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'name', async: true })
@Injectable()
export class CheckName implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const name = validationArguments.value;
    const exists = await this.usersService.findByName(name);
    return !exists;
  }
}
