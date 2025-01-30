import { IsEmail, IsString, Length, Matches, Validate } from 'class-validator';
import { CheckEmail } from '../../users/validation/check-email';
import { CheckUsername } from '../../users/validation/check-username';

export class CreateUserDto {
  @Length(3, 20, {
    message: 'Длина имени пользователя должна быть от 3 до 20 символов',
  })
  @IsString()
  @Matches(/^[\w\S]*$/, {
    message: 'Имя пользователя не должно содержать пробелов',
  })
  @Validate(CheckUsername, {
    message: 'Пользователь с таким именем существует',
  })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Введите корректный email' })
  @Validate(CheckEmail, {
    message: 'Пользователь с таким почтовым адресом существует',
  })
  email: string;

  @IsString()
  @Length(8, 30, { message: 'Длина пароля должна быть от 8 до 30 символов' })
  @Matches(/^[a-zA-Z0-9!'#%&'()*+,-./:;<=>?@[/\]^_{|}~]*$/, {
    message:
      'Пароль должен содержать спецсимволы (!@#%&*()=+/<>?[]{}|), символы (A-Z,a-z), цифры (0-9)',
  })
  password: string;

  @IsString()
  isAdmin: string;
}
