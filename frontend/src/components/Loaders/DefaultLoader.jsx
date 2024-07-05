import { useTranslation } from 'react-i18next';

function DefaultLoader() {
  const { t } = useTranslation();

  return (
    <div className="h-100 m-auto d-flex flex-column justify-content-center align-items-center text-secondary">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t('appStatus.loading')}</span>
      </div>
      <p className="pt-3">{t('appStatus.loading')}</p>
    </div>
  );
}

export default DefaultLoader;
