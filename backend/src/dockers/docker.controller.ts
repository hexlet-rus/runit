import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DockerService } from './docker.service';
import { Output } from '../console/interfaces/output.interface';

@ApiTags('runCode')
@Controller('docker')
export class DockerController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly dockerService: DockerService) {}

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
    return this.dockerService.run(code, language);
  }
}
