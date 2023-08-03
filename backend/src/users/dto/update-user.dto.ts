import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CheckEmail } from '../validation/check-email';
import { CheckUsername } from '../validation/check-login';
import { CheckPassword } from '../validation/check-password';
import { ComparePasswords } from '../validation/compare-passwords';

export class UpdateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
    description: 'Must be unique!',
    example: 'UpdatedJohnDoe',
    pattern: '/[A-Za-z]/',
    required: false,
  })
  @IsOptional()
  @Length(3, 20)
  @IsString()
  @Matches(/^[\w\S]*$/)
  @Validate(CheckUsername, {
    message: 'Уже существует!',
  })
  username?: string;

  @ApiProperty({
    description: 'Must be unique!',
    example: 'updated-jane-doe@mail.ru',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Уже существует!',
  })
  email?: string;

  @ApiProperty({
    description: 'Current account password',
    example: 'haew6wae56a45ewgd',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(CheckPassword, {
    message: 'Неверный пароль!',
  })
  currPassword?: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 30,
    description: 'New password',
    example: 'ha6ew6ewa5gea',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(8, 30)
  password?: string;

  @ApiProperty({
    example: 'ha6ew6ewa5gea',
    description: 'Must be equal with password field!',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword?: string;
}
