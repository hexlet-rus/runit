import { execSync } from 'node:child_process';
import IRunner from './IRunner';
import { buildRunnerCommand } from './utils';

export default class PhpRunner implements IRunner {
  run(code: string) {
    const command = buildRunnerCommand('php', code);
    try {
      const stdout = execSync(command, {
        stdio: 'pipe',
        maxBuffer: 1024 * 1024,
      }).toString();
      return { terminal: stdout.split('\n'), alertLogs: [] };
    } catch (error) {
      const message = error.output.toString();
      return { terminal: [message], alertLogs: [] };
    }
  }
}
