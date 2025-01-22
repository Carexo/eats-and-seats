import { Outlet } from 'react-router';
import Navbar from "./navbar/Navbar.tsx";


const Layout = () => {
  return (
    <div>
        <Navbar />
      <Outlet />
    </div>
  );
};


export default Layout;
