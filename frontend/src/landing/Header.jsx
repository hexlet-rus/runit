import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import routes from '../routes';
import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar expand="xl" className="fs-5 p-5 gap-5">
      <Container fluid className='justify-content-between'>
        <Navbar.Brand>
          <Image src={RunItLogo} />
        </Navbar.Brand>
        <Navbar.Toggle
          title="Burger"
          aria-controls="navbar-responsive"
          data-bs-toogle="collapse"
        />
        <Navbar.Collapse id="navbar-responsive" className="justify-content-center">
          <Nav className="gap-4">
            <Nav.Link className="text-white">
              <Link to={routes.landingPath()} />
              <span>О проекте</span>
            </Nav.Link>
            <Nav.Link className="text-white">
              <Link to={routes.landingPath()} />
              <span>Преимущества</span>
            </Nav.Link>
            <Nav.Link className="text-white">
              <Link to={routes.landingPath()} />
              Возможности
            </Nav.Link>
            <Nav.Link className="text-white">
              <Link to={routes.landingPath()} />
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="navbar-responsive" className="justify-content-end">
          <Nav className="gap-3">
            <Button className='rounded-5' size="lg" variant="primary">
              Войти
            </Button>
            <Button className='rounded-5' size="lg" variant="light">
              <span className="text-primary">Зарегистрироваться</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
