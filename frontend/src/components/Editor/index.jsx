import Editor from '@monaco-editor/react';
import { useTernaryDarkMode } from 'usehooks-ts';

import { useEditor } from './hooks.js';

function CodeEditor({ readOnly = false }) {
  const { isDarkMode } = useTernaryDarkMode();

  const { code, language, onChange } = useEditor();

  const monacoEditorTheme = isDarkMode ? 'vs-dark' : 'vs';

  const options = {
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly,
  };

  return (
    <div className="h-100 w-100">
      <Editor
        defaultLanguage={language}
        theme={monacoEditorTheme}
        value={code}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
