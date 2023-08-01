import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../hooks';

import Navigation from '../components/Navigation/index.jsx';
import Footer from '../components/Footer/index.jsx';
import DefaultLoader from '../components/Loaders/DefaultLoader.jsx';

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
  const userSlice = useSelector((state) => state.user);

  if (userSlice.status === 'fullfilled') {
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
