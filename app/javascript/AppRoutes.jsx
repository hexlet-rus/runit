import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { App } from './App.jsx';
import { Profile } from './Pages/Profile.jsx';
import { SignUp } from './Pages/SignUp.jsx';
import { SignIn } from './Pages/SignIn.jsx';
import { About } from './Pages/About.jsx';
import { Landing } from './Pages/Landing/Landing.jsx';
import { LicenseAgreement } from './Pages/LicenseAgreement.jsx';
import { RemindPassword } from './Pages/RemindPassword.jsx';
import { Repls } from './components/Repls';
import { useAuth } from './hooks';
import Layout from './components/Layout.jsx';
import EmbedSnippet from './components/Embed/EmbedSnippet.jsx';

import routes from './routes.js';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={routes.signUpPagePath()} replace />;
  }
  return children ? children : <Outlet />;
};

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/editor" element={<App />} />
        <Route path={routes.aboutPagePath()} element={<About />} />
        <Route element={<ProtectedRoute user={isLoggedIn} />}>
          <Route path={routes.profilePagePath()} element={<Profile />} />
        </Route>
        <Route path={routes.signUpPagePath()} element={<SignUp />} />
        <Route path={routes.loginPagePath()} element={<SignIn />} />
        <Route
          path={routes.remindPassPagePath()}
          element={<RemindPassword />}
        />
        <Route
          path={routes.licenseAgreementPath()}
          element={<LicenseAgreement />}
        />
      </Route>
      <Route path={routes.embedPagePath()} element={<EmbedSnippet />} />
      <Route path="*" element={<div>{t('appRotes.pageNotFound')}</div>} />
    </Routes>
  );
}

export default AppRoutes;
