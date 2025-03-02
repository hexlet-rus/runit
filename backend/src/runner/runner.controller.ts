import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RunnerService } from './runner.service';
import { Output } from '../console/interfaces/output.interface';

@ApiTags('runCode')
@Controller('api/runner')
export class RunnerController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly runnerService: RunnerService) {}

  @Get('run')
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
    return this.runnerService.run(code, language);
  }
}
