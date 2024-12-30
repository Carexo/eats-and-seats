import { Link, Outlet } from 'react-router';
import { Button, Flex, Typography } from 'antd';
import { useLogout } from '../api/queries/auth.ts';
import { useActions, useAuth } from '../store/hooks.ts';

const Layout = () => {
  const { logoutUser, notificationSend } = useActions();
  const auth = useAuth();

  const { mutate } = useLogout(notificationSend, logoutUser);

  const handleLogout = () => {
    mutate();
  };

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
