import React, { memo } from 'react';
import { useButton } from '../Button/hooks';
import { useTranslation } from 'react-i18next';
import classes from '../Button/Button.module.css';

export const EmbedRunButton = memo(() => {
  const { onClick, disabled } = useButton();
  const { t } = useTranslation();

  return (
    <button
      style={{ width: '15%' }}
      type="button"
      className={`btn btn-success btn-lg ${classes.embedRunButton}`}
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {t('embedFrame.runButton')}
    </button>
  );
});
