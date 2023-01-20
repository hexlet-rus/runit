import React from 'react';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return <div>{t('appRotes.pageNotFound')}</div>;
}

export default NotFound;
