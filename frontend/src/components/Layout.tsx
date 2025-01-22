import { Link, Outlet } from 'react-router';
import { Button, Flex, Typography } from 'antd';
import { useCheckLoggedStatus, useLogout } from '../api/queries/auth.ts';
import { useActions, useAuth } from '../store/hooks.ts';
import { useEffect } from 'react';
import Cart from './cart/Cart.tsx';
import { useGetInitCart } from '../hooks/cart/useGetInitCart.ts';

const Layout = () => {
  const { loginUser, logoutUser, notificationSend } = useActions();
  const userStatusMutation = useCheckLoggedStatus(loginUser);
  const getCart = useGetInitCart();

  const auth = useAuth();

  const logoutMutation = useLogout(notificationSend, logoutUser);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
      <nav>
        <Flex gap="small">
          <Link to="/">Home</Link>
          navigation
          {auth.isLogged ? (
            <>
              <Typography.Text>{auth.username}</Typography.Text>
              <Button onClick={handleLogout}>Logout</Button>

              {auth.role === 'admin' && <Link to="/admin">Dashboard</Link>}
            </>
          ) : (
            <Link to="/auth/signin">Log in</Link>
          )}
          <Cart />
        </Flex>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
