import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';
import { ComparePasswords } from '../validation/compare-passwords';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  @Matches(/[A-Za-z]/)
  name: string;

  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Email уже существует!',
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 30)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword: string;
}
