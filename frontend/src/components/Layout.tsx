import { Link, Outlet } from 'react-router';
import { Button, notification } from 'antd';
import { useLogout } from '../api/queries/auth.ts';
import { useActions, useAuth } from '../store/hooks.ts';

const Layout = () => {
  const [api, contextHolder] = notification.useNotification();
  const actions = useActions();

  const { mutate } = useLogout(api, actions.logoutUser);
  const auth = useAuth();

  const handleLogout = () => {
    mutate();
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        navigation
        {auth.isLogged ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/auth/signin">Log in</Link>
        )}
      </nav>
      {contextHolder}
      <Outlet />
    </div>
  );
};

export default Layout;
