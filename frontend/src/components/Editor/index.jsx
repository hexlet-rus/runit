import Editor from '@monaco-editor/react';
import { useTernaryDarkMode } from 'usehooks-ts';

import { useEditor } from './hooks.js';
import theme from '../../utils/theme.js';

function CodeEditor({ readOnly = false }) {
  const { isDarkMode } = useTernaryDarkMode();

  const { beforeMount, code, language, onChange, onMount } = useEditor();

  const monacoEditorTheme = isDarkMode ? 'dark' : 'light';

  const options = {
    minimap: {
      enabled: false,
    },
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly,
    useTabStops: false,
    tabSize: 2,
    fontFamily: theme.monospaceFontFamily,
    fixedOverflowWidgets: true,
  };

  return (
    <div className="h-100 w-100">
      <Editor
        beforeMount={beforeMount}
        defaultLanguage={language}
        defaultValue={code}
        onChange={onChange}
        onMount={onMount}
        options={options}
        theme={monacoEditorTheme}
      />
    </div>
  );
}

export default CodeEditor;
