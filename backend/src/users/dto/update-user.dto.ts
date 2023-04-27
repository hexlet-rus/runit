import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';
import { CheckLogin } from '../validation/check-login';
import { CheckPassword } from '../validation/check-password';
import { ComparePasswords } from '../validation/compare-passwords';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(3, 16)
  @IsString()
  @Matches(/^[\w\S]*$/)
  @Validate(CheckLogin, {
    message: 'Уже существует!',
  })
  login?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Уже существует!',
  })
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
  @Length(8, 30)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword?: string;
}
