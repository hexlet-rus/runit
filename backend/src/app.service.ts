import { Injectable } from '@nestjs/common';
import { Output } from './console/interfaces/output.interface';
import getRunner from './runner/index';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  async run(code: string, language: string): Promise<Output> {
    const runner = getRunner(language);
    const result = runner.run(code);
    return Promise.resolve(result);
  }
}
