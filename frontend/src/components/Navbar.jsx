import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks';
import Logo from '../assets/landing/images/logo.svg';

export function NavigationBar() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar
      variant="dark"
      bg="dark"
      expand="lg"
      className="shadow-sm border-bottom-mb-5"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          className="d-flex"
          aria-hidden="true"
          href={routes.homePagePath()}
        >
          <Image
            alt="mainLabel"
            width={100}
            height={30}
            src={Logo}
            className="pb-1"
          />
          <Navbar.Text className="ms-1">{t('navbar.mainLabel')}</Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle as="button" aria-controls="navbar-toggler" />
        <Navbar.Collapse id="navbar-toggler">
          <Nav as="ul" className="d-flex justify-content-end">
            {auth.isLoggedIn && (
              <Nav.Item as="li">
                <Nav.Link
                  as={Link}
                  className="nav-link px-3"
                  to={routes.profilePagePath()}
                >
                  {t('navbar.profile')}
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                className="nav-link px-3"
                to={routes.aboutPagePath()}
              >
                {t('navbar.about')}
              </Nav.Link>
            </Nav.Item>
            {auth.isLoggedIn && (
              <Nav.Item as="li">
                <Button type="button" className="px-3" onClick={auth.logOut}>
                  {t('navbar.logout')}
                </Button>
              </Nav.Item>
            )}
            {!auth.isLoggedIn && (
              <Nav.Item as="li">
                <Nav.Link
                  as={Link}
                  className="px-3"
                  to={routes.loginPagePath()}
                >
                  {t('navbar.signIn')}
                </Nav.Link>
              </Nav.Item>
            )}
            {!auth.isLoggedIn && (
              <Nav.Item as="li">
                <Nav.Link
                  as={Link}
                  className="px-3"
                  to={routes.signUpPagePath()}
                >
                  {t('navbar.signUp')}
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
