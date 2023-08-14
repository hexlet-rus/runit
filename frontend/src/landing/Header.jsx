import { Link } from 'react-router-dom';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import routes from '../routes';
import RunItLogo from './assets/LogoLight.svg';

function Header() {
  return (
    <Navbar className='fs-5 text-white' style={{ background: '#050914' }}>
      <Container className='m-5' fluid>
        <Navbar.Brand className="ms-5 translate-left">
          <Image src={RunItLogo} />
        </Navbar.Brand>
        <Nav className="gap-3 position-absolute top-50 start-50 translate-middle">
          <Nav.Link className='text-white'>
            <Link to={routes.landingPath()}/>
            <span>О проекте</span>
          </Nav.Link>
          <Nav.Link className='text-white'>
            <Link to={routes.landingPath()} />
            <span>Преимущества</span>
          </Nav.Link>
          <Nav.Link className='text-white'>
            <Link to={routes.landingPath()} />
            Возможности
          </Nav.Link>
          <Nav.Link className='text-white'>
            <Link to={routes.landingPath()} />
            FAQ
          </Nav.Link>
        </Nav>
        <Nav className="me-5 gap-4 translate-right">
          <Button className='btn-lg' variant='primary'>Войти</Button>
          <Button className='btn-lg' variant='light'><span className='text-primary'>Зарегистрироваться</span></Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
