import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateSnippetDto {
  @ApiProperty({ example: 'console.log("Hello world!");' })
  @IsString()
  code: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 30,
    example: 'My snippet',
  })
  @Length(1, 30)
  @IsString()
  name: string;
}
