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

const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar
      expand="sm"
      bg="dark-subtle"
      data-bs-theme="dark"
      className="navigation-container"
    >
      <Container fluid className="px-xl-5">
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? routes.myProfilePagePath() : routes.landingPath()}
        >
          <Image
            alt={t('navbar.mainLabel')}
            src={Logo}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="border-0"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavMenu />
          <Nav
            as="ul"
            className="flex-row flex-wrap ms-md-auto align-items-center gap-2"
          >
            <LanguageSelector />
            <ThemeSelector />
            {isLoggedIn ? <UserMenu /> : <AuthButtons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
