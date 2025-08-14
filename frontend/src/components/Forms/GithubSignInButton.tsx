import { useTranslation } from 'react-i18next';

import { Github } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

import routes from '../../routes.js';

const OAUTH_LINK = new URL(routes.oAuthPath(), window.location.origin);

if (process.env.NODE_ENV !== 'production') {
  OAUTH_LINK.port = '5001';
}

const handleClick = () => {
  localStorage.removeItem('guestUserData');
};

function GithubSignInButton() {
  const { t: tFA, i18n } = useTranslation('translation', {
    keyPrefix: 'formActions',
  });

  if (i18n.language === 'ru') {
    return null; // Для ru скрываем вход по github
  }

  return (
    <Button
      as="a"
      href={OAUTH_LINK.toString()}
      onClick={handleClick}
      variant="outline-secondary"
    >
      <Github className="bi me-1" />
      {tFA('withGithub')}
    </Button>
  );
}

export default GithubSignInButton;
