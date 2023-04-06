import { IsString, Validate, IsEmail } from 'class-validator';
import { CheckEmail } from '../validation/check-email';

export class RecoverUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  frontendUrl: string;
}
