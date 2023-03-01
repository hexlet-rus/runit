import { IsString, Validate, IsEmail } from 'class-validator';
import { CheckEmail } from '../validation/check-email';

export class RecoverUserDto {
  @IsString()
  @IsEmail()
  @Validate(CheckEmail, {
    message: 'Email не найден!',
  })
  email: string;

  @IsString()
  frontendUrl: string;
}
