import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks';
import Logo from '../../assets/landing/images/logo.svg';

export function Navbar() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark text-white shadow-sm border-bottom-mb-5">
      <div className="container">
        <Link
          className="d-flex navbar-brand"
          aria-hidden="true"
          to={routes.homePagePath()}
        >
          <img
            alt="mainLabel"
            width={100}
            height={30}
            src={Logo}
            className="pb-1"
          />
          <span className="ms-1">{t('navbar.mainLabel')}</span>
        </Link>
        <div className="navbar-nav justify-content-end">
          {auth.isLoggedIn && (
            <Link className="nav-link px-3" to={routes.profilePagePath()}>
              {t('navbar.profile')}
            </Link>
          )}
          <Link className="nav-link px-3" to={routes.aboutPagePath()}>
            {t('navbar.about')}
          </Link>
          {auth.isLoggedIn && (
            <button
              type="button"
              className="btn nav-link px-3"
              onClick={auth.logOut}
            >
              {t('navbar.logout')}
            </button>
          )}
          {!auth.isLoggedIn && (
            <Link className="nav-link px-3" to={routes.loginPagePath()}>
              {t('navbar.signIn')}
            </Link>
          )}
          {!auth.isLoggedIn && (
            <Link className="nav-link px-3" to={routes.signUpPagePath()}>
              {t('navbar.signUp')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
