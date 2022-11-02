import React from 'react';

import Editor from '@monaco-editor/react';

import { useEditor } from './hooks.js';
import { useTranslation } from 'react-i18next';
import classes from './Editor.module.css';

export function MonacoEditor() {
  const { code, language, onChange, editorDidMount } = useEditor();
  const { t } = useTranslation();
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const isLoggedIn = loginStatus ? loginStatus.status : false;

  const options = {
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly: !isLoggedIn,
  };

  const vdom = <div className={`text-center fw-bold fs-4 ${classes.banner}`}>
    {t('editor.authBanner')}
  </div>;

  return (
    <div className={classes.wrapper}>
      {!isLoggedIn ? vdom : ''}
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
