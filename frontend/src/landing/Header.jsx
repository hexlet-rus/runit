import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import routes from '../routes';
import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand className="pb-lg-4">
          <Image fluid src={RunItLogo} width="80%" />
          <Navbar.Toggle
            aria-controls="navbar-responsive"
            className="border-0"
            data-bs-toogle="collapse"
          >
            <Image src={Burger} />
          </Navbar.Toggle>
        </Navbar.Brand>
        <Navbar.Collapse className="mb-3 mb-lg-0" id="navbar-responsive">
          <Nav className="gap-2 text-center">
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>О проекте</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>Преимущества</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>Возможности</span>
            </Nav.Link>
            <Nav.Link as={Link} to={routes.landingPath()}>
              <span>FAQ</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="mb-3 mb-lg-0" id="navbar-responsive">
          <Nav className="gap-2 ms-auto">
            <Button className="rounded-5 d-flex px-5" variant="primary">
              <span>Войти</span>
            </Button>
            <Button className="rounded-5 d-flex px-5" variant="light">
              <span className="text-primary">Зарегистрироваться</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
