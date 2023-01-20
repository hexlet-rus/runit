import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useButton } from '../SnippetButton/hooks';
import classes from '../SnippetButton/SnippetButton.module.css';

export const EmbedRunButton = memo(() => {
  const { onClick, disabled } = useButton();
  const { t } = useTranslation();

  return (
    <button
      style={{ width: '25%' }}
      type="button"
      className={`btn btn-primary btn-lg ${classes.embedRunButton}`}
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {t('embedFrame.runButton')}
    </button>
  );
});
