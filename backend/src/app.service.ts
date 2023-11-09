import * as vm from 'node:vm';
import { Console } from 'node:console';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { createContext } from './console/console.config';
import { Output } from './console/interfaces/output.interface';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  async run(code: string, language: string): Promise<Output> {
    if (language === 'html') {
      return { terminal: [code], alertLogs: [] };
    }
    const alertLogs = [];
    const stdout = new Transform({
      transform(chunk, enc, cb) {
        cb(null, chunk);
      },
    });
    const logger = new Console({ stdout });

    const context = createContext(logger, alertLogs);
    vm.createContext(context);

    try {
      const script = new vm.Script(code);

      // run the script
      script.runInContext(context);
      const terminal = (stdout.read() || '').toString().split('\n');
      return { terminal, alertLogs };
    } catch (err) {
      const lineOfError = err.stack
        .split('evalmachine.<anonymous>:')[1]
        .substring(0, 1);
      const errorMsg = `${err.message} at line ${lineOfError}`;
      return { terminal: [errorMsg], alertLogs };
    }
  }
}
