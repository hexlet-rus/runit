import { Outlet } from 'react-router-dom';

function PageBackgroundWrapper() {
  return (
    <div className="page-bg-image">
      <Outlet />
    </div>
  );
}

export default PageBackgroundWrapper;
