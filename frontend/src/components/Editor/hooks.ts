// import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootReducerType } from 'src/types/slices';
import type { ColourThemeConfigType } from 'src/types/components';

import { actions, AppDispatch } from '../../slices';
import theme from '../../utils/theme';

const lightTheme: ColourThemeConfigType = {
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

const darkTheme: ColourThemeConfigType = {
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
  const dispatch = useDispatch<AppDispatch>();

  // TODO: нужно уходить от передачи кода в запросе на компиляцию и передавать только данные снипета, который нужно запустить
  const { code, snippetData } = useSelector(
    (state: RootReducerType) => state.editor,
  );
  const language = useSelector(
    (state: RootReducerType) => state.languages.currentLanguage,
  );
  const snippet = { ...snippetData, language };

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme('light', lightTheme);
    monaco.editor.defineTheme('dark', darkTheme);
  };

  const onChange = (newCode: string) => {
    dispatch(actions.updateCode(newCode));
  };

  const onMount = (editor, monaco) => {
    editor.focus();
    // eslint-disable-next-line no-bitwise
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const currentCode = editor.getValue();
      dispatch(actions.runCode({ ...snippet, code: currentCode }));
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
