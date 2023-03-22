import { useTranslation } from 'react-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { MonacoEditor } from './components/Editor/index.jsx';
import { SnippetButton } from './components/SnippetButton/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';

function App() {
  const isAllSaved = useSelector((state) => state.editor.isAllSaved);
  const { t } = useTranslation();

  return (
    <main className="container-fluid bg-dark py-5">
      <div className="row mb-2">
        <div className="col-12">
          <SnippetButton />
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

export default App;
