import IRunner from './IRunner';

export default class HtmlRunner implements IRunner {
  run(code: string) {
    return { terminal: [code], alertLogs: [] };
  }
}
