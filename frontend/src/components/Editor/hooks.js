// import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices';
import theme from '../../utils/theme.js';

const lightTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      background: theme.colors.light.bg,
      token: '',
    },
  ],
  colors: {
    'editor.foreground': `#${theme.colors.light.color}`,
    'editor.background': `#${theme.colors.light.bg}`,
  },
};

const darkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: theme.colors.dark.bg,
      token: '',
    },
  ],
  colors: {
    'editor.foreground': `#${theme.colors.dark.color}`,
    'editor.background': `#${theme.colors.dark.bg}`,
  },
};

export const useEditor = () => {
  const dispatch = useDispatch();

  const code = useSelector((state) => state.editor.code);
  const language = useSelector((state) => state.languages.currentLanguage);

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme('light', lightTheme);
    monaco.editor.defineTheme('dark', darkTheme);
  };

  const onChange = (newCode) => {
    dispatch(actions.updateCode(newCode));
  };

  const onMount = (editor, monaco) => {
    editor.focus();
    // eslint-disable-next-line no-bitwise
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const currentCode = editor.getValue();
      dispatch(actions.runCode(currentCode));
    });
  };

  return {
    beforeMount,
    code,
    language,
    onChange,
    onMount,
  };
};
