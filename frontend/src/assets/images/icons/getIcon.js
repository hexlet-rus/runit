import JavaScriptIcon from './javascript.svg';
import phpIcon from './php.svg';
import pythonIcon from './python.svg';
import HTMLIcon from './html.svg';

const getIcon = (language) => {
  const iconsMappping = {
    javascript: JavaScriptIcon,
    php: phpIcon,
    python: pythonIcon,
    html: HTMLIcon,
  };

  return iconsMappping[language];
};

export default getIcon;
