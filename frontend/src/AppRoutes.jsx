import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks';
import Layout from './components/Layout.jsx';

import routes from './routes.js';

const Profile = lazy(() => import('./Pages/Profile.jsx'));
const App = lazy(() => import('./App.jsx'));
const About = lazy(() => import('./Pages/About.jsx'));
const SignUp = lazy(() => import('./Pages/SignUp.jsx'));
const SignIn = lazy(() => import('./Pages/SignIn.jsx'));
const Landing = lazy(() => import('./Pages/Landing/Landing.jsx'));
const LicenseAgreement = lazy(() => import('./Pages/LicenseAgreement.jsx'));
const RemindPassword = lazy(() => import('./Pages/RemindPassword.jsx'));
const NotFound = lazy(() => import('./Pages/NotFound.jsx'));
const EmbedSnippet = lazy(() => import('./components/Embed/EmbedSnippet.jsx'));

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to={routes.loginPagePath()} replace />;
  }
  return children || <Outlet />;
}

function AuthRoute({ user, children }) {
  if (user) {
    return <Navigate to={routes.defaultProfilePagePath()} replace />;
  }
  return children || <Outlet />;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className="min-vh-100 bg-dark d-flex flex-column justify-content-center align-items-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">
              {t('appRoute.loadingSpinner')}
            </span>
          </div>
          <p className="fw-bold p-3 text-light">
            {t('appRoutes.loadingSpinner')}
          </p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path={routes.homePagePath()} element={<App />} />
          <Route path={routes.snippetPagePath()} element={<App />} />
          <Route path={routes.aboutPagePath()} element={<About />} />
          <Route element={<ProtectedRoute user={isLoggedIn} />}>
            <Route
              path={routes.defaultProfilePagePath()}
              element={<Profile />}
            />
            <Route
              path={routes.profileSettingsPagePath()}
              element={<Profile />}
            />
            <Route path={routes.pageProfilePath()} element={<Profile />} />
          </Route>
          <Route element={<AuthRoute user={isLoggedIn} />}>
            <Route path={routes.signUpPagePath()} element={<SignUp />} />
            <Route path={routes.loginPagePath()} element={<SignIn />} />
          </Route>
          <Route
            path={routes.remindPassPagePath()}
            element={<RemindPassword />}
          />
          <Route
            path={routes.licenseAgreementPath()}
            element={<LicenseAgreement />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path={routes.embedSnippetPagePath()}
          element={<EmbedSnippet />}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
