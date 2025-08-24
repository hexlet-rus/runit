import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';
import LanguageSelector from '../../components/Navigation/LanguageSelector';
import ThemeSelector from '../../components/Navigation/ThemeSelector';
import routes from '../../routes';

import RunItLogoLight from './assets/LogoHeaderLightTheme.svg';
import RunItLogoDark from './assets/LogoHeaderDarkTheme.svg';
import Burger from './assets/Burger.svg';

import './landing.scss';
import './custom-colors.scss';

function Header() {
  const { t: tLH } = useTranslation('translation', {
    keyPrefix: 'landing.header',
  });
  const { t: tPA } = useTranslation('translation', {
    keyPrefix: 'profileActions',
  });
  const { isDarkMode } = useTernaryDarkMode();

  const logo = isDarkMode ? RunItLogoDark : RunItLogoLight;
  return (
    <header>
      <Navbar expand="lg">
        <Container className="justify-content-between">
          <Navbar.Brand className="mr-5">
            <Image className="navbar-logo" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-responsive"
            className="border-0 ms-auto"
            data-bs-toogle="collapse"
          >
            <Image src={Burger} />
          </Navbar.Toggle>
          <Navbar.Collapse className="my-3 mb-lg-0" id="navbar-responsive">
            <Nav as="ul" className="text-left text-xl-center">
              <li>
                <Navbar.Brand className="header-link" href="#aboutProject">
                  <span>{tLH('about')}</span>
                </Navbar.Brand>
              </li>
              <li>
                <Navbar.Brand className="header-link" href="#advantages">
                  <span>{tLH('advantages')}</span>
                </Navbar.Brand>
              </li>
              <li>
                <Navbar.Brand className="header-link" href="#possibilities">
                  <span>{tLH('opportunities')}</span>
                </Navbar.Brand>
              </li>
              <li>
                <Navbar.Brand className="header-link" href="#faq">
                  <span>{tLH('faq')}</span>
                </Navbar.Brand>
              </li>
            </Nav>
            <Nav
              as="ul"
              className="mb-3 mb-lg-0 gap-1 ms-auto align-items-xl-center align-items-start"
            >
              <LanguageSelector />
              <ThemeSelector />
              <Button
                as="a"
                className="rounded-5 btn-signin"
                href={routes.signInPagePath()}
                variant="primary"
              >
                <span>{tPA('signIn')}</span>
              </Button>
              <Button
                as="a"
                className="rounded-5 btn-signup"
                href={routes.signUpPagePath()}
                variant="secondary"
              >
                <span>{tPA('signUp')}</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
