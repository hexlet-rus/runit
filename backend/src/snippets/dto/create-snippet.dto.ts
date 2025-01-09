import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

enum LANGUAGES {
  RUBY = 'ruby',
  JAVA = 'java',
  PHP = 'php',
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  HTML = 'html'
}

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

  @IsString()
  @ApiProperty({
    enum: LANGUAGES,
    example: LANGUAGES.JAVASCRIPT
  })
  language: string;
}
