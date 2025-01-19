import {
  IsEmail,
  // IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  // Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { CheckUsername } from '../../users/validation/check-username';
// import { CheckEmail } from '../../users/validation/check-email';

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
  // @Validate(CheckUsername, {
  //   message: 'usernameIsUsed',
  // })
  username?: string;

  @ApiProperty({
    description: 'Must be unique!',
    example: 'updated-jane-doe@mail.ru',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  // @Validate(CheckEmail, {
  //   message: 'emailIsUsed',
  // })
  email?: string;

  @ApiProperty({
    description: 'Administrator privileges',
    example: 'on | off',
  })
  @IsOptional()
  @IsString()
  isAdmin?: string;
}
