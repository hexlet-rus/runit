import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import routes from '../../routes.js';

function AuthButtons() {
  const { t } = useTranslation();

  return (
    <>
      <Nav.Item as="li">
        <Button as={Link} to={routes.signInPagePath()} variant="primary">
          {t('profileActions.signIn')}
        </Button>
      </Nav.Item>
      <Nav.Item as="li">
        <Button
          as={Link}
          to={routes.signUpPagePath()}
          variant="outline-primary"
        >
          {t('profileActions.signUp')}
        </Button>
      </Nav.Item>
    </>
  );
}

export default AuthButtons;
