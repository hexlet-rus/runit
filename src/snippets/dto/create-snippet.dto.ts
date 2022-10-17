import { IsString } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  code: any;
}
