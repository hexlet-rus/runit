import { useTranslation } from 'react-i18next';

function DefaultLoader() {
  const { t: tAS } = useTranslation('translations', { keyPrefix: 'appStatus' });

  return (
    <div className="h-100 m-auto d-flex flex-column justify-content-center align-items-center text-secondary">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{tAS('loading')}</span>
      </div>
      <p className="pt-3">{tAS('loading')}</p>
    </div>
  );
}

export default DefaultLoader;
