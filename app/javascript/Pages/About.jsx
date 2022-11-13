import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

export function About() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mt-5">
        <h3>{t('about.pageHeader')}</h3>
        <p>
          <strong>{t('about.projectName')}</strong>{t('about.projectDescription')}
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
      </div>
      <footer className="mt-auto pb-5 bg-light fixed-bottom">
        <div className="container-xl">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 pt-3">
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">{t('about.footer.hexlet')}</h3>
              <a className="text-secondary" href={routes.aboutPagePath()}>
                {t('about.footer.about')}
              </a>
              <a
                className="text-secondary"
                href="https://github.com/Hexlet/hexlet-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.code')}
              </a>
              <a
                className="text-secondary"
                href="https://slack-ru.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.linkToSlack')}
              </a>
            </div>
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">{t('about.footer.help')}</h3>
              <a
                className="text-secondary"
                href="https://ru.hexlet.io/webinars"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.knowledgeBase')}
              </a>
              <a
                className="text-secondary"
                href="https://guides.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.linkToHexletGuides')}
              </a>
            </div>
            <div className="col d-flex flex-column mb-2">
              <h3 className="h3 pb-2 border-bottom">{t('about.footer.more')}</h3>
              <a
                className="text-secondary"
                href="https://ru.code-basics.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.linkToCodeBasics')}
              </a>
              <a
                className="text-secondary"
                href="https://codebattle.hexlet.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.footer.linkToCodeBattles')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
