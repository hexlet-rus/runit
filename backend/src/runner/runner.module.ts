import { Module } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { RunnerController } from './runner.controller';

@Module({
  imports: [],
  providers: [RunnerService],
  controllers: [RunnerController],
})
export class RunnerModule {}
