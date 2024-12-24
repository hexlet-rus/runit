import { execSync } from 'node:child_process';
import IRunner from './IRunner';
import { buildRunnerCommand } from './utils';

export default class PythonRunner implements IRunner {
  run(code: string) {
    const command = buildRunnerCommand('python', code);
    try {
      const stdout = execSync(command, {
        stdio: 'pipe',
        maxBuffer: 1024 * 1024,
      }).toString();
      return { terminal: stdout.split('\n'), alertLogs: [] };
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
      return { terminal: [trimmedMessage], alertLogs: [] };
    }
  }
}
