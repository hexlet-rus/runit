import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({ example: 'jane-doe@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'haew6wae56a45ewgd' })
  @IsString()
  password: string;
}
