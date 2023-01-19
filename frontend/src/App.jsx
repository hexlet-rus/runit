import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLoaderData } from 'react-router';
import { useParams } from 'react-router-dom';
import { MonacoEditor } from './components/Editor/index.jsx';
import { Button } from './components/Button/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';
import { actions } from './slices/index.js';
import { useSnippets } from './hooks';

export function App() {
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const params = useParams();

  useEffect(() => {
    const loadSnippet = async () => {
      const snippetParams = {
        login: params.login,
        slug: params.slug,
      };
      if (snippetApi.hasViewSnippetParams(snippetParams)) {
        const snippetData = await snippetApi.getSnippetDataByViewParams(
          snippetParams,
        );
        dispatch(actions.updateCode(snippetData.code));
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
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-5 mb-5">
          <MonacoEditor />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <Terminal />
        </div>
      </div>
    </main>
  );
}
