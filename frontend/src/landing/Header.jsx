import { Link } from 'react-router-dom';
import {
  Container,
  Navbar,
  Image,
  Nav,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

import RunItLogoLight from './assets/LogoHeaderLightTheme.svg';
import RunItLogoDark from './assets/LogoHeaderDarkTheme.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.scss';
import './custom-colors.scss';

function Header() {
  const { t } = useTranslation();
  const IsThemeModeLight = window.matchMedia(
    '(prefers-color-scheme: light)',
  ).matches;
  const logo = IsThemeModeLight ? RunItLogoLight : RunItLogoDark;

  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <Row className="justify-content-between gap-5">
            <Col>
              <div className="d-flex flex-nowrap justify-content-between gap-5">
                <Navbar.Brand className="m-0">
                  <Image fluid src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls="navbar-responsive"
                  className="border-0 ms-auto"
                  data-bs-toogle="collapse"
                >
                  <Image src={Burger} />
                </Navbar.Toggle>
              </div>
              <Navbar.Collapse className="my-3 mb-lg-0" id="navbar-responsive">
                <Nav as="ul" className="gap-2 text-center d-lg-none mb-3">
                  <li>
                    <Navbar.Brand className="header-link" href="#aboutProject">
                      <span>{t('landing.header.advantages')}</span>
                    </Navbar.Brand>
                  </li>
                  <li>
                    <Navbar.Brand className="header-link" href="#advantages">
                      <span>Преимущества</span>
                    </Navbar.Brand>
                  </li>
                  <li>
                    <Navbar.Brand className="header-link" href="#possibilities">
                      <span>{t('landing.header.opportunities')}</span>
                    </Navbar.Brand>
                  </li>
                  <li>
                    <Navbar.Brand className="header-link" href="#faq">
                      <span>{t('faq.faq')}</span>
                    </Navbar.Brand>
                  </li>
                </Nav>
                <Nav className=" mb-3 mb-lg-0 gap-3 ms-auto d-lg-none">
                  <Button
                    as={Link}
                    className="rounded-5 d-flex px-5 justify-content-center btn-signin"
                    to={routes.signInPagePath()}
                    variant="primary"
                  >
                    <span>{t('profileActions.signIn')}</span>
                  </Button>
                  <Button
                    as={Link}
                    className="rounded-5 d-flex px-5 justify-content-center btn-signup"
                    to={routes.signUpPagePath()}
                    variant="secondary"
                  >
                    <span>{t('profileActions.signUp')}</span>
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col className="mt-5 mt-lg-0 d-none d-lg-block">
              <Nav
                as="ul"
                className="h-100 gap-2 text-center align-items-center"
              >
                <li>
                  <Navbar.Brand className="header-link" href="#aboutProject">
                    <span>{t('landing.header.advantages')}</span>
                  </Navbar.Brand>
                </li>
                <li>
                  <Navbar.Brand className="header-link" href="#advantages">
                    <span>Преимущества</span>
                  </Navbar.Brand>
                </li>
                <li>
                  <Navbar.Brand className="header-link" href="#possibilities">
                    <span>{t('landing.header.opportunities')}</span>
                  </Navbar.Brand>
                </li>
                <li>
                  <Navbar.Brand className="header-link" href="#faq">
                    <span>{t('faq.faq')}</span>
                  </Navbar.Brand>
                </li>
              </Nav>
            </Col>
            <Col className="d-none d-lg-block">
              <Nav className="gap-3 ms-auto h-100 align-items-center">
                <Button
                  as={Link}
                  className="rounded-5 d-flex px-5 justify-content-center btn-signin"
                  to={routes.signInPagePath()}
                  variant="primary"
                >
                  <span>{t('profileActions.signIn')}</span>
                </Button>
                <Button
                  as={Link}
                  className="rounded-5 d-flex px-5 justify-content-center btn-signup"
                  to={routes.signUpPagePath()}
                  variant="secondary"
                >
                  <span>{t('profileActions.signUp')}</span>
                </Button>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
