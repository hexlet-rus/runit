import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSettingsDto {
  @ApiProperty()
  @IsString()
  theme?: string;

  @ApiProperty()
  @IsString()
  language?: string;
}
