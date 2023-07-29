import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './SnippetButton.module.css';
import { useButton } from './hooks';
import { useAuth, useSnippets } from '../../hooks';

import { actions as modalActions } from '../../slices/modalSlice.js';

export const SnippetButton = memo(() => {
  const { onClick, disabled, update } = useButton();
  const [snippetData, setSnippetData] = useState({});
  const dispatch = useDispatch();
  const auth = useAuth();
  const snippetsApi = useSnippets();
  const { t } = useTranslation();
  const params = useParams();
  const snippetParams = {
    login: params.login,
    slug: params.slug,
  };
  const hasViewSnippetParams = snippetsApi.hasViewSnippetParams(snippetParams);

  useEffect(() => {
    const getSnippetData = async () => {
      if (hasViewSnippetParams) {
        const response = await snippetsApi.getSnippetDataByViewParams(
          snippetParams,
        );
        // #TODO: remove check once redirect to 404 is configured
        if (response.length === 0) {
          dispatch(modalActions.openModal({ type: 'snippetUnavailable' }));
        }
        const { id, name } = response;
        setSnippetData((state) => ({ ...state, id, name }));
      }
    };
    getSnippetData();
  }, []);

  const handleGettingInfo = () => {
    dispatch(
      modalActions.openModal({
        type: 'gettingInfo',
      }),
    );
  };

  const handleSnippetSave = () => {
    dispatch(
      modalActions.openModal({
        type: 'genNewRepl',
        item: {
          header: t('modals.saveHeader'),
        },
      }),
    );
  };

  const handleReplSharing = () => {
    dispatch(
      modalActions.openModal({
        type: 'sharingRepl',
        item: {
          name: snippetData?.name,
          id: snippetData?.id,
          link: snippetsApi.genViewSnippetLink(params.login, params.slug),
          embedLink: snippetsApi.genEmbedSnippetLink(params.login, params.slug),
        },
      }),
    );
  };

  const handleShareEvent = async () => {
    if (!auth.isLoggedIn) handleGettingInfo();
    else if (!hasViewSnippetParams) handleSnippetSave();
    else handleReplSharing();
  };

  return (
    <div
      className={`d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center text-center ${classes.container}`}
    >
      <button
        type="button"
        className={`btn btn-primary btn-lg ${classes.runButton}`}
        disabled={disabled}
        onClick={() => {
          onClick();
          hasViewSnippetParams && update(snippetData?.id, snippetData?.name);
        }}
      >
        {t('editor.runButton')}
      </button>
      <button
        type="button"
        className={`btn btn-outline-primary btn-lg ${classes.shareButton}`}
        onClick={handleShareEvent}
      >
        {t('editor.shareButton')}
      </button>
    </div>
  );
});
