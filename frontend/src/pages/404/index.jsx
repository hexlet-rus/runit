import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTernaryDarkMode } from 'usehooks-ts';

function NotFound() {
  const { t: tPNF } = useTranslation('translation', {
    keyPrefix: 'pageNotFound',
  });
  const { isDarkMode } = useTernaryDarkMode();
  const paragraphClass = `fs-5 mb-3 ${isDarkMode ? '' : 'text-black '}`;

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
          <h1 className="mb-4">{tPNF('title')}</h1>
          <p className={paragraphClass}>{tPNF('whatHappened.title')}</p>
          <p className="mb-4">{tPNF('whatHappened.body')}</p>
          <p className={paragraphClass}>{tPNF('whyHappened.title')}</p>
          <p className="mb-4">{tPNF('whyHappened.body')}</p>
          <p className={paragraphClass}>{tPNF('whatToDo.title')}</p>
          <p className="mb-2">
            {tPNF('whatToDo.body')}
            <Link to="/">{tPNF('whatToDo.returnButton')}</Link>
          </p>
          <p className="mb-0">
            {tPNF('support.writeToUs')}
            <a href="mailto:runit@hexlet.io" rel="nofollow">
              {tPNF('support.link')}
            </a>
            {tPNF('support.promise')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
