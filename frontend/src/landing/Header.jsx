import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

import './landing.scss';

import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { t } = useTranslation();

  return (
    <header>
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
            <Nav as="ul" className="gap-2 text-center">
              <li>
                <Nav.Link className="header-link" href="#aboutProject">
                  <span>{t('landing.header.about')}</span>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="header-link" href="#advantages">
                  <span>{t('landing.header.advantages')}</span>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="header-link" href="#possibilities">
                  <span>{t('landing.header.opportunities')}</span>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link className="header-link" href="#faq">
                  <span>{t('faq.faq')}</span>
                </Nav.Link>
              </li>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="mb-3 mb-lg-0" id="navbar-responsive">
            <Nav className="gap-3 ms-auto">
              <Button
                as={Link}
                className="rounded-5 d-flex px-5 justify-content-center btn-signin"
                to={routes.signInPagePath()}
                variant="primary"
              >
                <span>{t('signIn.signInButton')}</span>
              </Button>
              <Button
                as={Link}
                className="rounded-5 d-flex px-5 justify-content-center btn-signup"
                to={routes.signUpPagePath()}
                variant="secondary"
              >
                <span>{t('signUp.registerButton')}</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
