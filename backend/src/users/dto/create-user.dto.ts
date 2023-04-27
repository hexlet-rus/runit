import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';
import { CheckLogin } from '../validation/check-login';
import { ComparePasswords } from '../validation/compare-passwords';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 16)
  @IsString()
  @Matches(/^[\w\S]*$/)
  @Validate(CheckLogin, {
    message: 'Пользователь уже существует!',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Пользователь уже существует!',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword: string;
}
