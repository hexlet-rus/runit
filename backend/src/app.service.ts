import * as vm from 'node:vm';
import { Console } from 'node:console';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { createContext } from './console/console.config';
import { Output } from './console/interfaces/output.interface';
import { execSync } from 'node:child_process';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this

  async run(code: string, language: string): Promise<Output> {
    if (language === 'html') {
      return { terminal: [code], alertLogs: [] };
    }

    if (language === 'python') {
      const alertLogs = [];
      try {
        const command = `docker run --memory="256m" --cpus="1" --rm -i --read-only --user 1000:1000 my-code-runner-python python -c "${code.replace(
          /"/g,
          '\\"',
        )}"`;
        const stdout = execSync(command, {
          stdio: 'pipe',
          maxBuffer: 1024 * 1024,
        }).toString();
        const terminal = stdout.split('\n');
        return { terminal, alertLogs };
      } catch (error) {
        const lineOfError = error.stack;
        const startIndex =
          lineOfError.indexOf('Traceback') === -1
            ? lineOfError.indexOf('File')
            : lineOfError.indexOf('Traceback');
        const trimmedMessage = lineOfError
          .slice(startIndex)
          .split('\n')
          .slice(0, 5)
          .join('\n');
        const errorMsg = `${trimmedMessage}`;
        return { terminal: [errorMsg], alertLogs };
      }
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
      console.log(err.message);
      const lineOfError = err.stack
        .split('evalmachine.<anonymous>:')[1]
        .substring(0, 1);
      const errorMsg = `${err.message} at line ${lineOfError}`;
      return { terminal: [errorMsg], alertLogs };
    }
  }
}
