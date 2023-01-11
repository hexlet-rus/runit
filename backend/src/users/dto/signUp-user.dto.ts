import { IsEmail, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
