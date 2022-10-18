import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateSnippetDto {
  @IsOptional()
  @IsString()
  @Length(1, 30)
  name?: string;

  @IsString()
  code?: any;
}
