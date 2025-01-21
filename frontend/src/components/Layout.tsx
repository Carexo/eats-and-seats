import { Link, Outlet } from 'react-router';
import { Button, Flex, Typography } from 'antd';
import { useCheckLoggedStatus, useLogout } from '../api/queries/auth.ts';
import { useActions, useAuth } from '../store/hooks.ts';
import { useEffect } from 'react';

const Layout = () => {
  const { loginUser, logoutUser, notificationSend } = useActions();
  const userStatusMutation = useCheckLoggedStatus(loginUser);

  const auth = useAuth();

  const logoutMutation = useLogout(notificationSend, logoutUser);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    userStatusMutation.mutate();
    // eslint-disable-next-line
  }, []);

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
        </Flex>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
