import React, { useEffect } from 'react';

import Editor from '@monaco-editor/react';

import { useTranslation } from 'react-i18next';
import { useEditor } from './hooks.js';
import { useAuth } from '../../hooks';
import { useDispatch } from 'react-redux';
import classes from './Editor.module.css';
import { fetchData } from '../../slices/userSlice.js';

function AuthBanner() {
  const { t } = useTranslation();

  return (
    <div className={`text-center fw-bold ${classes.banner}`}>
      {t('editor.authBanner')}
    </div>
  );
}

export function MonacoEditor() {
  const { code, language, onChange } = useEditor();
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const options = {
    selectOnLineNumbers: true,
    wordWrap: true,
    readOnly: !isLoggedIn,
  };

  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .catch((serializedError) => {
        const error = new Error(serializedError.message);
        error.name = serializedError.name;
        throw error;
      });
  }, []);

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
