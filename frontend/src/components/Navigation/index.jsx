import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAuth } from '../../hooks';
import routes from '../../routes.js';

import Logo from '../../assets/images/RunITLogo.svg';
import AuthButtons from './AuthButtons.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import NavMenu from './NavMenu.jsx';
import ThemeSelector from './ThemeSelector.jsx';
import UserMenu from './UserMenu.jsx';
import GuestMenu from './GuestMenu.jsx';

function Navigation() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  const guestUser = localStorage.getItem('guestUserData');

  return (
    <Navbar
      bg="body-tertiary"
      className="navigation-container"
      data-bs-theme="dark"
      expand="sm"
    >
      <Container className="px-xl-3" fluid>
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? routes.myProfilePagePath() : routes.landingPath()}
        >
          <Image
            alt={t('navbar.mainLabel')}
            className="logo-height"
            src={Logo}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-0"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavMenu />
          <Nav
            as="ul"
            className="flex-row flex-wrap ms-sm-auto align-items-center gap-2"
          >
            <LanguageSelector />
            <ThemeSelector />
            {isLoggedIn && !guestUser && <UserMenu />}
            {isLoggedIn && guestUser && <GuestMenu />}
            {!isLoggedIn && <AuthButtons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
