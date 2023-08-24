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
import routes from '../routes';
import RunItLogo from './assets/LogoLight.svg';
import Burger from './assets/Burger.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar expand="sm">
      <Container className="justify-content-center">
        <Row>
          <Col className="d-flex flex-nowrap justify-content-between mb-3">
            <Navbar.Brand>
              <Image fluid src={RunItLogo} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="navbar-responsive"
              className="border-0"
              data-bs-toogle="collapse"
            >
              <Image src={Burger} />
            </Navbar.Toggle>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Collapse id="navbar-responsive">
              <Nav className="gap-2 mx-auto text-center">
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
                <Nav.Link className="text-white mb-3">
                  <Link to={routes.landingPath()} />
                  FAQ
                </Nav.Link>
              </Nav>
              <Nav className="gap-2">
                <Button className="rounded-5 d-flex px-5 justify-content-center" variant="primary">
                  <span>Войти</span>
                </Button>
                <Button className="rounded-5 d-flex px-5 justify-content-center mb-3" variant="light">
                  <span className="text-primary">Зарегистрироваться</span>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
