import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { App } from './App.jsx';
import { Profile } from './Pages/Profile.jsx';
import { SignUp } from './Pages/SignUp.jsx';
import { SignIn } from './Pages/SignIn.jsx';
import { About } from './Pages/About.jsx';
import { RemindPassword } from './Pages/RemindPassword.jsx';
import { Repls } from './components/Repls';

import routes from './routes.js';

function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.aboutPagePath()} element={<About />} />
      <Route path={routes.homePagePath()} element={<App />} />
      <Route path={routes.profilePagePath()} element={<Profile />} />
      <Route path={routes.signUpPagePath()} element={<SignUp />} />
      <Route path={routes.loginPagePath()} element={<SignIn />} />
      <Route path={routes.remindPassPagePath()} element={<RemindPassword />} />
      <Route path={routes.replsPagePath()} element={<Repls />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
