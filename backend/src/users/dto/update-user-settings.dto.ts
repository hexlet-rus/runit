import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  theme?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar_base64?: string;
}
