import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      <nav>navigation</nav>
      <Outlet />
    </div>
  );
};

export default Layout;
