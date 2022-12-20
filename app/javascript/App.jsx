import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router';
import { MonacoEditor } from './components/Editor/index.jsx';
import { Button } from './components/Button/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';
import { actions } from './slices/index.js';
import { useSnippets } from './hooks';

export function App() {
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const loaderData = useLoaderData();

  useEffect(() => {
    const loadSnippet = async () => {
      if (snippetApi.hasViewSnippetParams(loaderData)) {
        const snippetData = await snippetApi.getSnippetDataByViewParams(
          loaderData,
        );
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
