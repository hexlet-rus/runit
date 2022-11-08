import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  login?: string;

  @IsEmail()
  email?: string;

  @IsString()
  password: string;
}
