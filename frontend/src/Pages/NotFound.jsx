import React from 'react';

function NotFound() {
  const { t } = useTranslation();

  return (<div>{t('appRotes.pageNotFound')}</div>);
}

export default NotFound;