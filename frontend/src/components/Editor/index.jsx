import Editor from '@monaco-editor/react';

import { useEditor } from './hooks.js';
import { useTheme } from '../../hooks';
import { useEffect } from 'react';

function CodeEditor({ readOnly = false }) {
  const { theme, resolvedTheme } = useTheme();

  const { code, language, onChange } = useEditor();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const options = {
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly,
  };

  return (
    <div className="h-100 w-100">
      <Editor
        defaultLanguage={language}
        theme={resolvedTheme === 'light' ? 'vs' : 'vs-dark'}
        value={code}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
