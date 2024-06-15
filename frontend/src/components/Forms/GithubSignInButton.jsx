import { useTranslation } from 'react-i18next';

import { Github } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

import routes from '../../routes.js';

const OAUTH_LINK = new URL(routes.oAuthPath(), window.location.origin);

if (process.env.NODE_ENV !== 'production') {
  OAUTH_LINK.port = '5001';
}

function GithubSignInButton() {
  const { t: tFA } = useTranslation('translation', { keyPrefix: 'formActions' });

  return (
    <Button as="a" href={OAUTH_LINK.toString()} variant="outline-secondary">
      <Github className="bi me-1" />
      {tFA('withGithub')}
    </Button>
  );
}

export default GithubSignInButton;
