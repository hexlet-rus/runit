import { IsString, Length } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  code: any;
  @Length(1, 30)
  @IsString()
  name: any;
}
