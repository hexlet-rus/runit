import React from 'react';
import { MonacoEditor } from './components/Editor/index.jsx';
import { Button } from './components/Button/index.jsx';
import { Terminal } from './components/Terminal/index.jsx';

export function App() {
  return (
    <main className="container-fluid my-5">
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
