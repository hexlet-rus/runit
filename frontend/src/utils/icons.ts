import JavaScriptIcon from '../assets/images/icons/javascript.svg';
import PhpIcon from '../assets/images/icons/php.svg';
import PythonIcon from '../assets/images/icons/python.svg';
import HTMLIcon from '../assets/images/icons/html.svg';
import JavaIcon from '../assets/images/icons/java.svg';
import RubyIcon from '../assets/images/icons/ruby.svg';

const icons: Map<unknown, string> = new Map()
  .set('javascript', JavaScriptIcon)
  .set('python', PythonIcon)
  .set('php', PhpIcon)
  .set('html', HTMLIcon)
  .set('java', JavaIcon)
  .set('ruby', RubyIcon);

export default icons;
