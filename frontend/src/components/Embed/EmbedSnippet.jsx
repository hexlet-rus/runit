import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MonacoEditor } from '../Editor';
import { EmbedRunButton } from './EmbedRunButton.jsx';
import { Terminal } from '../Terminal';
import { actions } from '../../slices/index.js';
import { useSnippets } from '../../hooks';
import classes from '../SnippetButton/SnippetButton.module.css';

function EmbedSnippet() {
  const snippetApi = useSnippets();
  const dispatch = useDispatch();
  const url = new URL(window.location);
  const encodedId = url.searchParams.get('snippet');
  const snippetLink = snippetApi.genSnippetLink(encodedId);
  const { t } = useTranslation();

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

  return (
    <main style={{ position: 'absolute', top: '0', width: '730px' }}>
      <nav
        className="navbar navbar-expand-md shadow-sm"
        style={{ padding: '0', background: '#212529' }}
      >
        <div
          className="container-fluid d-flex justify-content-end"
          style={{ gap: '20%' }}
        >
          <EmbedRunButton />
          <a
            type="button"
            className={`edit-on-runit text-decoration-none border-0 bg-transparent ${classes.button}`}
            style={{ color: '#136ef6', fontFamily: 'Onest, sans-serif' }}
            href={snippetLink}
            title="Runit-logo"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="d-flex flex-column align-items-end"
              style={{ lineHeight: '1' }}
            >
              <span style={{ fontSize: '13px', marginRight: '5px' }}>
                {t('embedFrame.logoOffer')}
              </span>
              <span style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                {t('embedFrame.logo')}
              </span>
            </div>
          </a>
        </div>
      </nav>
      <div
        className="d-flex"
        style={{
          gap: '1px',
          background: 'gray',
          height: '300px',
          overflow: 'auto',
        }}
      >
        <div className="col-6">
          <MonacoEditor />
        </div>
        <div className="col-6" style={{ overflow: 'auto' }}>
          <Terminal />
        </div>
      </div>
    </main>
  );
}

export default EmbedSnippet;
