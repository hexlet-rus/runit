import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  login?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  password: string;
}
