import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavigationBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks';
import Logo from '../assets/landing/images/logo.svg';
import classes from './Navbar.module.css';

export function Navbar() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <NavigationBar
      variant="dark"
      bg="dark"
      expand="md"
      className="border-bottom-mb-5"
    >
      <Container>
        <NavigationBar.Brand
          as={Link}
          className="d-flex align-items-baseline"
          to={routes.homePagePath()}
        >
          <Image
            alt={t('navbar.mainLabel')}
            width={100}
            height={30}
            src={Logo}
            aria-hidden="true"
            className={`${classes.navbarLogo}`}
          />{' '}
          <NavigationBar.Text
            className={`${classes.navbarText} ms-3 text-white`}
          >
            {t('navbar.mainLabel')}
          </NavigationBar.Text>
        </NavigationBar.Brand>
        <NavigationBar.Toggle as="button" aria-controls="navbar-toggler" />
        <NavigationBar.Collapse
          id="navbar-toggler"
          className="justify-content-end"
        >
          <Nav as="ul">
            {auth.isLoggedIn && (
              <Nav.Item as="li" className="d-flex align-items-center px-2">
                <Nav.Link as={Link} to={routes.profilePagePath()}>
                  {t('navbar.profile')}
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item as="li" className="d-flex align-items-center px-2">
              <Nav.Link as={Link} to={routes.aboutPagePath()}>
                {t('navbar.about')}
              </Nav.Link>
            </Nav.Item>
            {auth.isLoggedIn && (
              <Nav.Item as="li" className="py-2 px-2">
                <Button variant="primary" as={Button} onClick={auth.logOut}>
                  {t('navbar.logout')}
                </Button>
              </Nav.Item>
            )}
            {!auth.isLoggedIn && (
              <Nav.Item as="li" className="py-2 px-2">
                <Button variant="light" as={Link} to={routes.loginPagePath()}>
                  {t('navbar.signIn')}
                </Button>
              </Nav.Item>
            )}
            {!auth.isLoggedIn && (
              <Nav.Item as="li" className="py-2 px-2">
                <Button
                  variant="primary"
                  as={Link}
                  to={routes.signUpPagePath()}
                >
                  {t('navbar.signUp')}
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </NavigationBar.Collapse>
      </Container>
    </NavigationBar>
  );
}
