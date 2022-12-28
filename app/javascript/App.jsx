import React, { useEffect } from 'react';
import { MonacoEditor } from './components/Editor/index.jsx';
import { Button } from './components/Button/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';
import { actions } from './slices/index.js';
import { useDispatch } from 'react-redux';
import { useSnippets } from './hooks';

export function App() {
  const dispatch = useDispatch();
  const snippetApi = useSnippets();

  useEffect(() => {
    const loadSnippet = async () => {
      if (snippetApi.hasSnippetParams()) {
        const decodedId = snippetApi.getSnippetIdFromParams();
        const snippetData = await snippetApi.getSnippetData(decodedId);
        dispatch(actions.updateCode(snippetData.code));
      }
    };
    loadSnippet();
  }, []);

  return (
    <main className="container-fluid bg-dark py-5">
      <div className="row mb-4">
        <div className="col-12">
          <Button />
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
