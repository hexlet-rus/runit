import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';
import { CheckLogin } from '../validation/check-login';
import { CheckPassword } from '../validation/check-password';
import { ComparePasswords } from '../validation/compare-passwords';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(CheckLogin, {
    message: 'Уже существует!',
  })
  login?: string;

  @IsOptional()
  @IsNotEmpty()
  @Validate(CheckEmail, {
    message: 'Уже существует!',
  })
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(CheckPassword, {
    message: 'Неверный пароль!',
  })
  currPassword?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword?: string;
}
