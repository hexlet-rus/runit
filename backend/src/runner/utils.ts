import config from './dockerConfig';

const buildRunnerCommand = (language, code) => {
  const memoryStr = config.languageDocker.config.memory
    ? `--memory="${config.languageDocker.config.memory}"`
    : '';
  const cpusStr = config.languageDocker.config.cpus
    ? `--cpus="${config.languageDocker.config.cpus}"`
    : '';
  const readOnlyStr = config.languageDocker.config.readOnly
    ? '--read-only'
    : '';
  const codeStr = `"${code.replace(/"/g, '\\"')}"`;
  const containerTag = `${config.languageDocker.languageImagesTag}-${language}`;
  const command = [
    'docker run --rm -i --user 1000:1000',
    memoryStr,
    cpusStr,
    readOnlyStr,
    containerTag,
    config.languageDocker.languages[language].command,
    codeStr,
  ].join(' ');

  return command;
};

export default { buildRunnerCommand };

export { buildRunnerCommand };
