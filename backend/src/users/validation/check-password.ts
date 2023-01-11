/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'currPassword', async: true })
@Injectable()
export class CheckPassword implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const { ...object }: any = validationArguments.object;
    const exists = await this.usersService.findOne(object.id);
    return bcrypt.compareSync(object.currPassword, exists.password);
  }
}
