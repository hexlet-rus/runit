/* eslint-disable class-methods-use-this */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Output } from './console/interfaces/output.interface';

@ApiTags('common')
@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}

  @Get('compile')
  @ApiQuery({
    name: 'code',
    description: 'Code to execute(only supports JS by now)',
    example: 'console.log("Hello world!");',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Code successfully executed',
  })
  async getLogs(@Query('snippet') snippet: any): Promise<Output> {
    const { language, code } = snippet;
    return this.appService.run(code, language);
  }
}
