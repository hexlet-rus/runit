import IRunner from './IRunner';

export default class HtmlRunner implements IRunner {
  // eslint-disable-next-line class-methods-use-this
  run(code: string) {
    return Promise.resolve({ terminal: [code], alertLogs: [] });
  }
}
