import { promises as fsp } from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { execSync } from 'node:child_process';
import IRunner from './IRunner';
import config from './dockerConfig';

export default class PhpRunner implements IRunner {
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
      `php -f ${mainScriptPath}`,
    ].join(' ');

    return command;
  }

  // eslint-disable-next-line class-methods-use-this
  async run(code: string) {
    const tmpDirPath = await fsp.mkdtemp(path.join(os.tmpdir(), 'php-runner-'));
    const mainScriptPath = path.join(tmpDirPath, 'index.php');
    await fsp.writeFile(mainScriptPath, code);
    const scriptDockerPath = '/app/index.php';
    const command = PhpRunner.buildRunnerCommand(
      'php',
      scriptDockerPath,
      tmpDirPath,
    );
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
