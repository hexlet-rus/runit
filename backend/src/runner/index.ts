import PythonRunner from './PythonRunner';
import PhpRunner from './PhpRunner';
import JavaScriptRunner from './JavaScriptRunner';
import HtmlRunner from './HtmlRunner';
import IRunner from './IRunner';

const getRunner = (language: string): IRunner => {
  switch (language) {
    case 'python':
      return new PythonRunner();
    case 'php':
      return new PhpRunner();
    case 'javascript':
      return new JavaScriptRunner();
    case 'html':
      return new HtmlRunner();
    default:
      throw Error(`Unknown language ${language}`);
  }
};

export default getRunner;
