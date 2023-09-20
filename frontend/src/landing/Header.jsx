import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg">
      <Container className="justify-content-between">
        <div className="d-flex justify-content-between">
          <Navbar.Brand className="d-flex pb-lg-4">
            <Image fluid src={RunItLogo} width="80%" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-responsive"
            className="border-0"
            data-bs-toogle="collapse"
          >
            <Image src={Burger} />
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse className="mb-3 mb-lg-0" id="navbar-responsive">
          <Nav className="gap-2 text-center">
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>{t('landing.header.about')}</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>{t('landing.header.advantages')}</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>{t('landing.header.opportunities')}</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>{t('faq.faq')}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="mb-3 mb-lg-0" id="navbar-responsive">
          <Nav className="gap-2 ms-auto">
            <Button
              className="rounded-5 d-flex px-5 justify-content-center"
              variant="primary"
            >
              <span>{t('signIn.signInButton')}</span>
            </Button>
            <Button
              className="rounded-5 d-flex px-5 justify-content-center"
              variant="light"
            >
              <span className="text-primary">{t('signUp.registerButton')}</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
