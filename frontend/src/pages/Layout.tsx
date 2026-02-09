import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import type { RootReducerType } from 'src/types/slices';

import { useAuth } from '../hooks';

import Navigation from '../components/Navigation/index';
import Footer from './landing/Footer-1';
import DefaultLoader from '../components/Loaders/DefaultLoader';

function PageLayout() {
  return (
    <>
      <Navigation />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function AwaitUserData({ children }) {
  const userSlice = useSelector((state: RootReducerType) => state.user);

  if (userSlice.status === 'fulfilled') {
    return children;
  }

  return <DefaultLoader />;
}

function Layout() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <AwaitUserData>
        <PageLayout />
      </AwaitUserData>
    );
  }

  return <PageLayout />;
}

export default Layout;
