import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MonacoEditor } from './components/Editor/index.jsx';
import { Button } from './components/Button/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';
import { actions } from './slices/index.js';
import { useSnippets } from './hooks';

export function App() {
  const dispatch = useDispatch();
  const snippetApi = useSnippets();

  useEffect(() => {
    const loadSnippet = async () => {
      if (snippetApi.hasSnippetParams()) {
        const decodedId = snippetApi.getSnippetIdFromParams();
        const snippetData = await snippetApi.getSnippetData(decodedId);
        dispatch(actions.setCodeAndSavedCode(snippetData.code));
      }
    };
    loadSnippet();
  }, []);

  const isAllSaved = useSelector((state) => state.editor.isAllSaved);
  const { t } = useTranslation();

  return (
    <main className="container-fluid bg-dark py-5">
      <div className="row mb-2">
        <div className="col-12">
          <Button />
          <div className="mt-2 text-center text-muted">
            <small>
              {isAllSaved ? t('editor.allSaved') : t('editor.unsavedChanges')}
            </small>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <MonacoEditor />
        </div>
        <div className="col-6">
          <Terminal />
        </div>
      </div>
    </main>
  );
}
