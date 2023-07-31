import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container mb-5">
      <div className="row row-cols-1 row-cols-lg-2 align-items-lg-center">
        <div className="col">
          <img
            alt="404 error"
            className="img-fluid"
            loading="lazy"
            src="/notFound.svg"
          />
        </div>
        <div className="col">
          <h1 className="mb-4">{t('pageNotFound.title')}</h1>
          <p className="fs-5 text-black mb-3">
            {t('pageNotFound.whatHappened.title')}
          </p>
          <p className="mb-4">{t('pageNotFound.whatHappened.body')}</p>
          <p className="fs-5 text-black mb-3">
            {t('pageNotFound.whyHappened.title')}
          </p>
          <p className="mb-4">{t('pageNotFound.whyHappened.body')}</p>
          <p className="fs-5 text-black mb-3">
            {t('pageNotFound.whatToDo.title')}
          </p>
          <p className="mb-2">
            {t('pageNotFound.whatToDo.body')}
            <Link to="/">{t('pageNotFound.whatToDo.returnButton')}</Link>
          </p>
          <p className="mb-0">
            {t('pageNotFound.support.writeToUs')}
            <a href="mailto:runit@hexlet.io" rel="nofollow">
              {t('pageNotFound.support.link')}
            </a>
            {t('pageNotFound.support.promise')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
