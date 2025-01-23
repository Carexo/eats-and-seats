import { Menu } from 'antd';
import { useAuth } from '../../store/hooks.ts';
import { useLogout } from '../../api/queries/auth.ts';
import { RightMenuProps } from './RightMenu.types.ts';

const RightMenu = ({ mode }: RightMenuProps) => {
  const auth = useAuth();

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Menu mode={mode}>
      {auth.isLogged ? (
        <>
          <Menu.Item className={'button-important'}>
            <a onClick={handleLogout}>Log out</a>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            <a href="/auth/signin">Sign in</a>
          </Menu.Item>
          <Menu.Item className={'button-important'}>
            <a href="/auth/signup">Sign up</a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default RightMenu;
