import { useTranslation } from 'react-i18next';

import { Faq } from './Faq';

function AboutPage() {
  const { t: tA } = useTranslation('translation', { keyPrefix: 'about' });

  return (
    <div className="container-fluid py-5 m-0">
      <div className="container">
        <h3>{tA('pageHeader')}</h3>
        <p>
          <strong>{tA('projectName')}</strong>
          {tA('projectDescription')}
        </p>
        <p>
          {tA('analogueIs')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://replit.com/~"
            rel="noopener noreferrer"
            target="_blank"
          >
            {tA('analogueName')}
          </a>
          .
        </p>
        <p>
          {tA('backendIsOn')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/gid-po-nest-js?ysclid=l7ew5lpeiw134812170"
            rel="noopener noreferrer"
            target="_blank"
          >
            {tA('firstBackendDevTool')}
          </a>
          &nbsp;{tA('and')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/vse-chto-nuzhno-znat-novichku-o-typescript-ischerpyvayuschiy-gayd?ysclid=l7ewa0mrdp61534639"
            rel="noopener noreferrer"
            target="_blank"
          >
            {tA('secondBackendDevTool')}
          </a>
          {tA('frontendIsOn')}&nbsp;
          <a
            className="text-secondary text-decoration-none"
            href="https://ru.hexlet.io/blog/posts/biblioteka-react-review-article?ysclid=l7eweuntdr505174264"
            rel="noopener noreferrer"
            target="_blank"
          >
            {tA('frontendDevTool')}
          </a>
          .
        </p>
        <Faq />
      </div>
    </div>
  );
}

export default AboutPage;
