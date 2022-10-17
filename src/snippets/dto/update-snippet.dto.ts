import { IsString, Length } from 'class-validator';

export class UpdateSnippetDto {
  @Length(1, 30)
  @IsString()
  name?: string;

  @IsString()
  code?: any;
}
