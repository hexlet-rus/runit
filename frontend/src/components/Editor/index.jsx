import Editor from '@monaco-editor/react';

import { useEditor } from './hooks.js';
import { useTheme } from '../../hooks';

function CodeEditor({ readOnly = false }) {
  const { resolvedTheme } = useTheme();

  const { code, language, onChange } = useEditor();

  const monacoEditorTheme = resolvedTheme === 'light' ? 'vs' : 'vs-dark';

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
