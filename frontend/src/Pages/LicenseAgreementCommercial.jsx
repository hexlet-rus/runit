import React from 'react';
import { useTranslation } from 'react-i18next';

export function LicenseAgreementCommercial() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid py-5 m-0 bg-dark text-white">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9">
            <div className="mb-4 text-center">
              <h2>{t('licAgrCommercial.h2')}</h2>
            </div>
            <p>{t('licAgrCommercial.title')}</p>
            <p>{t('licAgrCommercial.condition_1')}</p>
            <p>{t('licAgrCommercial.condition_2')}</p>
            <p>{t('licAgrCommercial.condition_3')}</p>
            <p>{t('licAgrCommercial.condition_4')}</p>
            <p>{t('licAgrCommercial.condition_5')}</p>
            <p>{t('licAgrCommercial.condition_6')}</p>
            <ul>
              <li>{t('licAgrCommercial.condition_6__li1')}</li>
              <li>{t('licAgrCommercial.condition_6__li2')}</li>
            </ul>
            <p> {t('licAgrCommercial.condition_6__1')}</p>
            <p>
              {t('licAgrCommercial.condition_7')}
              <a href="https://ru.hexlet.io/pages/personal_data">
                https://ru.hexlet.io/pages/personal_data
              </a>
              {t('licAgrCommercial.condition_7__1')}
            </p>
            <p>{t('licAgrCommercial.condition_8')}</p>
            <div>
              {t('licAgrCommercial.linkCommercial')}
              <a href="mailto:runit@hexlet.io">runit@hexlet.io</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
