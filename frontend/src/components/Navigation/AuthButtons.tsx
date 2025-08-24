import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import routes from '../../routes';

function AuthButtons() {
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });

  return (
    <>
      <Nav.Item as="li">
        <Button as="a" href={routes.signInPagePath()} variant="primary">
          {tPA('signIn')}
        </Button>
      </Nav.Item>
      <Nav.Item as="li">
        <Button as="a" href={routes.signUpPagePath()} variant="outline-primary">
          {tPA('signUp')}
        </Button>
      </Nav.Item>
    </>
  );
}

export default AuthButtons;
