import PythonRunner from './PythonRunner';
import PhpRunner from './PhpRunner';
import JavaScriptRunner from './JavaScriptRunner';
import HtmlRunner from './HtmlRunner';
import JavaRunner from './JavaRunner';
import RubyRunner from './RubyRunner';
import IRunner from './IRunner';

const buildRunner = (language: string): IRunner => {
  switch (language) {
    case 'python':
      return new PythonRunner();
    case 'php':
      return new PhpRunner();
    case 'javascript':
      return new JavaScriptRunner();
    case 'java':
      return new JavaRunner();
    case 'html':
      return new HtmlRunner();
    case 'ruby':
      return new RubyRunner();
    default:
      throw Error(`Unknown language ${language}`);
  }
};

export default buildRunner;
