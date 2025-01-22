import { Outlet } from 'react-router';
import { useCheckLoggedStatus } from '../api/queries/auth.ts';
import { useAuth } from '../store/hooks.ts';
import { useEffect } from 'react';
import { useGetInitCart } from '../hooks/cart/useGetInitCart.ts';
import Navbar from './navbar/Navbar.tsx';

const Layout = () => {
  const userStatusMutation = useCheckLoggedStatus();
  const getCart = useGetInitCart();

  const auth = useAuth();

  useEffect(() => {
    userStatusMutation.mutate();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, [auth]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
