/* eslint-disable react/jsx-sort-props */
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from './hooks';
import Layout from './Pages/Layout.jsx';
import routes from './routes.js';

import DefaultLoader from './components/Loaders/DefaultLoader.jsx';

const ProfilePage = lazy(() => import('./Pages/profile'));
const SettingsPage = lazy(() => import('./Pages/settings'));
const SnippetPage = lazy(() => import('./Pages/snippet'));
const About = lazy(() => import('./Pages/About.jsx'));
const SignUpPage = lazy(() => import('./Pages/signup'));
const SignInPage = lazy(() => import('./Pages/signin'));
const Landing = lazy(() => import('./Pages/Landing'));
const LicenseAgreement = lazy(() => import('./Pages/LicenseAgreement.jsx'));
const RemindPasswordPage = lazy(() => import('./Pages/remind_password'));
const NotFoundPage = lazy(() => import('./Pages/404'));
const EmbeddedPage = lazy(() => import('./Pages/embed'));

function MyProfileRoute() {
  const username = useSelector((state) => state.user.userInfo.login);

  return <Navigate to={routes.profilePagePath(username)} replace />;
}

function ProtectedRoute({ redirectTo = routes.homePagePath(), isAllowed }) {
  if (isAllowed) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} replace />;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <Suspense fallback={<DefaultLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path={routes.homePagePath()} element={<SnippetPage />} />
          <Route path={routes.snippetPagePath()} element={<SnippetPage />} />
          <Route path={routes.aboutPagePath()} element={<About />} />
          <Route path={routes.profilePagePath()} element={<ProfilePage />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={isLoggedIn}
                redirectTo={routes.signInPagePath()}
              />
            }
          >
            <Route
              path={routes.myProfilePagePath()}
              element={<MyProfileRoute />}
            />
            <Route
              path={routes.settingsPagePath()}
              element={<SettingsPage />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAllowed={!isLoggedIn}
                redirectTo={routes.myProfilePagePath()}
              />
            }
          >
            <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
            <Route path={routes.signInPagePath()} element={<SignInPage />} />
          </Route>

          <Route
            path={routes.remindPassPagePath()}
            element={<RemindPasswordPage />}
          />
          <Route
            path={routes.licenseAgreementPath()}
            element={<LicenseAgreement />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path={routes.embedSnippetPagePath()}
          element={<EmbeddedPage />}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
