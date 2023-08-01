import React from 'react';
import { useTranslation } from 'react-i18next';
// import routes from '../routes.js';
import { Faq } from './Faq.jsx';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid py-5 m-0 bg-dark text-white">
      <div className="container">
        <h3>{t('about.pageHeader')}</h3>
        <p>
          <strong>{t('about.projectName')}</strong>
          {t('about.projectDescription')}
        </p>
        <p>
          {t('about.analogueIs')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://replit.com/~"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.analogueName')}
          </a>
          .
        </p>
        <p>
          {t('about.backendIsOn')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/gid-po-nest-js?ysclid=l7ew5lpeiw134812170"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.firstBackendDevTool')}
          </a>
          &nbsp;{t('about.and')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/vse-chto-nuzhno-znat-novichku-o-typescript-ischerpyvayuschiy-gayd?ysclid=l7ewa0mrdp61534639"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.secondBackendDevTool')}
          </a>
          {t('about.frontendIsOn')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/biblioteka-react-review-article?ysclid=l7eweuntdr505174264"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('about.frontendDevTool')}
          </a>
          .
        </p>
        <Faq />
      </div>
    </div>
  );
}

export default AboutPage;
