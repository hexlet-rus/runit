import React from 'react';

import Editor from '@monaco-editor/react';

import { useEditor } from './hooks.js';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';
import classes from './Editor.module.css';

function AuthBanner() {
  const { t } = useTranslation();

  return (
    <div className={`text-center fw-bold fs-4 ${classes.banner}`}>
      {t('editor.authBanner')}
    </div>
  );
}

export function MonacoEditor() {
  const { code, language, onChange, editorDidMount } = useEditor();
  const { isLoggedIn } = useAuth();

  const options = {
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly: !isLoggedIn,
  };

  return (
    <div className={classes.wrapper}>
      {!isLoggedIn ? <AuthBanner /> : ''}
      <Editor
        defaultLanguage={language}
        theme="vs-dark"
        defaultValue={code}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}
