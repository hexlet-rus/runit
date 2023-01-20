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
  const [currentSnippetId, setCurrentSnippetId] = useState();
  const dispatch = useDispatch();
  const auth = useAuth();
  const snippetsApi = useSnippets();
  const { t } = useTranslation();
  const params = useParams();

  useEffect(() => {
    const getSnippetData = async () => {
      const snippetParams = {
        login: params.login,
        slug: params.slug,
      };
      if (snippetsApi.hasViewSnippetParams(snippetParams)) {
        const snippetData = await snippetsApi.getSnippetDataByViewParams(snippetParams);
        setCurrentSnippetId(snippetData.id);
      } else {
        setCurrentSnippetId(false);
      }
    };
    getSnippetData();
  }, []);

  const getTypeOfModal = (isLoggedIn) => {
    return isLoggedIn
      ? { type: 'sharingRepl', item: null }
      : { type: 'gettingInfo' };
  };

  const handleShareEvent = async () => {
    if (!snippetsApi.hasViewSnippetParams()) {
      dispatch(modalActions.openModal(getTypeOfModal(auth.isLoggedIn)));
    } else if (!auth.isLoggedIn) {
      dispatch(modalActions.openModal({ type: 'gettingInfo' }));
    } else {
      const viewSnippetParams = snippetsApi.getViewSnippetParams();
      const snippetData = await snippetsApi.getSnippetDataByViewParams(
        viewSnippetParams,
      );
      const snippetName = snippetData.name;
      dispatch(
        modalActions.openModal({
          type: 'sharingRepl',
          item: {
            name: snippetName,
            link: snippetsApi.genSnippetLink(
              snippetsApi.encodeId(snippetData.id),
            ),
          },
        }),
      );
    }
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
          update(currentSnippetId, params.slug);
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
