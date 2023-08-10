import { IsEmail, IsString, Length, Matches, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CheckEmail } from '../validation/check-email';
import { CheckLogin } from '../validation/check-login';
import { ComparePasswords } from '../validation/compare-passwords';

export class CreateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
    description: 'Must be unique!',
    example: 'JohnDoe',
    pattern: '/[A-Za-z]/',
  })
  @Length(3, 20)
  @IsString()
  @Matches(/^[\w\S]*$/)
  @Validate(CheckLogin, {
    message: 'loginIsUsed',
  })
  login: string;

  @ApiProperty({
    description: 'Must be unique!',
    example: 'jane-doe@mail.ru',
  })
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'emailIsUsed',
  })
  email: string;

  @ApiProperty({
    example: 'haew6wae56a45ewgd',
    minLength: 8,
    maxLength: 30,
  })
  @IsString()
  @Length(8, 30)
  @Matches(/^[a-zA-Z0-9!'#%&'()*+,-./:;<=>?@[/\]^_{|}~]*$/)
  password: string;

  @ApiProperty({
    example: 'haew6wae56a45ewgd',
    description: 'Must be equal with password field!',
  })
  @IsString()
  @Validate(ComparePasswords, {
    message: 'Пароли не совпадают!',
  })
  confirmPassword: string;
}
