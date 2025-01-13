export default {
  languageDocker: {
    languageImagesTag: 'runit-local-runner',
    config: {
      memory: '256m',
      cpus: 1,
      readOnly: true,
    },
    languages: {
      python: {
        language: 'python',
        command: 'python -c',
      },
      php: {
        language: 'php',
        command: 'php -r',
      },
      ruby: {
        language: 'ruby',
        command: 'ruby',
      },
    },
  },
};
