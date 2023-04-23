import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './Navbar.jsx';
import { buildFooter as Footer } from './Footer.jsx';

function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
