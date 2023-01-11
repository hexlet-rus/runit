/* eslint-disable class-methods-use-this */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Output } from './console/interfaces/output.interface';

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}

  @Get('compile')
  async getLogs(@Query('code') code: any): Promise<Output> {
    return this.appService.run(code);
  }
}
