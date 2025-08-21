import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import routes from '../../routes.js';

function AuthButtons() {
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });

  return (
    <>
      <Nav.Item as="li">
        <Button as={Link as any} to={routes.signInPagePath()} variant="primary">
          {tPA('signIn')}
        </Button>
      </Nav.Item>
      <Nav.Item as="li">
        <Button
          as={Link as any}
          to={routes.signUpPagePath()}
          variant="outline-primary"
        >
          {tPA('signUp')}
        </Button>
      </Nav.Item>
    </>
  );
}

export default AuthButtons;
