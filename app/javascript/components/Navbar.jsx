import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks';
import classes from './Navbar.module.css';
import Logo from '/app/assets/landing/images/logo.png'

export function Navbar() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark text-white shadow-sm border-bottom-mb-5">
        <div className="container-fluid">
          <div className="d-flex justify-content-start ps-4">
            <a
              className={`navbar-brand ${classes.navigationBrand}`}
              aria-hidden="true"
              href={routes.homePagePath()}
            >
              <img alt='mainLabel' src={ Logo } className='align-baseline me-1'/>
              {t('navbar.mainLabel')}
            </a>
          </div>
          <div className="d-flex justify-content-end">
            {auth.isLoggedIn && (
              <a
                className={`nav-link px-3 ${classes.navigationLink}`}
                href={routes.profilePagePath()}
              >
                {t('navbar.profile')}
              </a>
            )}
            <a
              className={`nav-link px-3 ${classes.navigationLink}`}
              href={routes.aboutPagePath()}
            >
              {t('navbar.about')}
            </a>
            {auth.isLoggedIn && (
              <button
                type="button"
                className={`btn nav-link px-3 ${classes.navigationLink}`}
                onClick={auth.logOut}
              >
                {t('navbar.logout')}
              </button>
            )}
            {!auth.isLoggedIn && (
              <a
                className={`nav-link px-3 ${classes.navigationLink}`}
                href={routes.loginPagePath()}
              >
                {t('navbar.signIn')}
              </a>
            )}
            {!auth.isLoggedIn && (
              <a
                className={`nav-link px-3 ${classes.navigationLink}`}
                href={routes.signUpPagePath()}
              >
                {t('navbar.signUp')}
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
