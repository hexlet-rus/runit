import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CheckEmail } from '../../users/validation/check-email';
import { CheckUsername } from '../../users/validation/check-username';

export class UpdateUserDto {
  @Length(3, 20, {
    message: 'usernameLength',
  })
  @IsString()
  @Matches(/^[\w\S]*$/, {
    message: 'incorrectUsername',
  })
  @Validate(CheckUsername, {
    message: 'usernameIsUsed',
  })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'incorrectEmail' })
  @Validate(CheckEmail, {
    message: 'emailIsUsed',
  })
  email: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isAdmin: boolean;
}
