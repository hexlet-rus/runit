/* eslint-disable class-methods-use-this */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Output } from './console/interfaces/output.interface';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

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
    status: 200, description: 'Code successfully executed',
  })
  async getLogs(@Query('code') code: any): Promise<Output> {
    return this.appService.run(code);
  }
}
