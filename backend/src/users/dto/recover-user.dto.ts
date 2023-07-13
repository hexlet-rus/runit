import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RecoverUserDto {
  @ApiProperty({
    example: 'jane-doe@mail.ru',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'localhost:5001',
  })
  @IsString()
  frontendUrl: string;
}
