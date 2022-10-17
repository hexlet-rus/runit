import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks';

export function Navbar() {
  const [menuStatus, setMenuStatus] = useState(false);
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <>
      {menuStatus && (
        <div
          className="offcanvas offcanvas-start show"
          style={{ 'z-index': 5000, width: '10rem', visibility: 'visible' }}
          tabIndex="-1"
          id="offcanvasStart"
          aria-labelledby="offcanvasStartLabel"
          aria-modal="true"
          role="dialog"
        >
          <div className="offcanvas-header">
            <p className="h5" id="offcanvasStartLabel">
              {t('navbar.menu')}
            </p>
            <button
              className="btn-close text-reset"
              type="button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => setMenuStatus(!menuStatus)}
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={routes.homePagePath()}
                >
                  {t('navbar.home')}
                </a>
              </li>
              <li className="nav-item">
                {' '}
                {/* TODO: add if logged in */}
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={routes.replsPagePath()}
                >
                  {t('navbar.myRepls')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm border-bottom-mb-5">
        <div className="container-fluid">
          <div className="d-flex justify-content-start">
            <button
              className="border-0 bg-white"
              type="button"
              onClick={() => setMenuStatus(!menuStatus)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <a
              className="navbar-brand"
              aria-hidden="true"
              href={routes.homePagePath()}
            >
              {t('navbar.mainLabel')}
            </a>
          </div>
          <div className="d-flex justify-content-end">
            {auth.isLoggedIn && (
              <a className="nav-link px-3" href={routes.profilePagePath()}>
                {t('navbar.profile')}
              </a>
            )}
            <a className="nav-link px-3" href={routes.aboutPagePath()}>
              {t('navbar.about')}
            </a>
            {auth.isLoggedIn && (
              <a
                className="nav-link px-3"
                href={routes.homePagePath()}
                onClick={async () => await auth.logout()}
              >
                {t('navbar.logout')}
              </a>
            )}
            {!auth.isLoggedIn && (
              <a className="nav-link px-3" href={routes.loginPagePath()}>
                {t('navbar.signIn')}
              </a>
            )}
            {!auth.isLoggedIn && (
              <a className="nav-link px-3" href={routes.signUpPagePath()}>
                {t('navbar.signUp')}
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
