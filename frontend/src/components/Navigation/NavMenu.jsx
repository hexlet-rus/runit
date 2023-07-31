import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { GridFill } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';

import { useAuth } from '../../hooks';
import routes from '../../routes.js';

function MySnippetsLink() {
  const { t } = useTranslation();
  const username = useSelector((state) => state.user.userInfo.login);

  return (
    <Nav.Item as="li">
      <Nav.Link
        as={Link}
        className="icon-link"
        eventKey={routes.profilePagePath(username)}
        to={routes.profilePagePath(username)}
      >
        <GridFill />
        {t('navbar.mySnippets')}
      </Nav.Link>
    </Nav.Item>
  );
}

function AboutLink() {
  const { t } = useTranslation();

  return (
    <Nav.Item as="li">
      <Nav.Link
        as={Link}
        eventKey={routes.aboutPagePath()}
        to={routes.aboutPagePath()}
      >
        {t('navbar.about')}
      </Nav.Link>
    </Nav.Item>
  );
}

function NavMenu() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <Nav activeKey={location.pathname} as="ul">
      {isLoggedIn ? <MySnippetsLink /> : null}
      <AboutLink />
    </Nav>
  );
}

export default NavMenu;
