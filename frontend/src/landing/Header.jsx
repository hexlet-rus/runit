import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import routes from '../routes';
import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar expand="lg">
      <Container className="justify-content-between flex-nowrap">
        <Navbar.Brand>
          <Image fluid src={RunItLogo} width="80%" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-responsive"
          className="border-0"
          data-bs-toogle="collapse"
        >
          <Image src={Burger} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-responsive">
          <Nav className="gap-2 text-center mb-3">
            <Nav.Link>
              <Link to={routes.landingPath()} />
              <span>О проекте</span>
            </Nav.Link>
            <Nav.Link>
              <Link to={routes.landingPath()} />
              <span>Преимущества</span>
            </Nav.Link>
            <Nav.Link>
              <Link to={routes.landingPath()} />
              Возможности
            </Nav.Link>
            <Nav.Link>
              <Link to={routes.landingPath()} />
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="navbar-responsive">
          <Nav className="gap-2 mb-3 ms-auto">
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
