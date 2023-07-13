import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateSnippetDto {
  @ApiProperty({
    required: false,
    minLength: 1,
    maxLength: 30,
    example: 'My updated snippet',
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty({ example: 'console.log("Hello world!");' })
  @IsString()
  code: string;
}
