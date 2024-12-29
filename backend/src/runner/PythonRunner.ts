import { promises as fsp } from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import IRunner from './IRunner';
import config from './dockerConfig';

export default class PythonRunner implements IRunner {
  static buildRunnerCommand(language, mainScriptPath, codeDirPath) {
    const memoryStr = config.languageDocker.config.memory
      ? `--memory="${config.languageDocker.config.memory}"`
      : '';
    const cpusStr = config.languageDocker.config.cpus
      ? `--cpus="${config.languageDocker.config.cpus}"`
      : '';
    const readOnlyStr = config.languageDocker.config.readOnly
      ? '--read-only'
      : '';
    const containerTag = `${config.languageDocker.languageImagesTag}-${language}`;
    const command = [
      'docker run --rm -i --user 1000:1000',
      memoryStr,
      cpusStr,
      readOnlyStr,
      `-v ${codeDirPath}:/app`,
      containerTag,
      `python ${mainScriptPath}`,
    ].join(' ');

    return command;
  }

  // eslint-disable-next-line class-methods-use-this
  async run(code: string) {
    const tmpDirPath = await fsp.mkdtemp(
      path.join(os.tmpdir(), 'python-runner-'),
    );
    const mainScriptPath = path.join(tmpDirPath, 'index.py');
    await fsp.writeFile(mainScriptPath, code);
    const scriptDockerPath = '/app/index.py';
    const command = PythonRunner.buildRunnerCommand(
      'python',
      scriptDockerPath,
      tmpDirPath,
    );
    try {
      const stdout = execSync(command, {
        stdio: 'pipe',
        maxBuffer: 1024 * 1024,
      }).toString();
      return Promise.resolve({ terminal: stdout.split('\n'), alertLogs: [] });
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
      return Promise.resolve({ terminal: [trimmedMessage], alertLogs: [] });
    }
  }
}
