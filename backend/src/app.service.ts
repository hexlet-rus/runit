import { Injectable } from '@nestjs/common';
import { Output } from './console/interfaces/output.interface';
import buildRunner from './runner/index';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  async run(code: string, language: string): Promise<Output> {
    const runner = buildRunner(language);
    const result = await runner.run(code);
    return result;
  }
}
