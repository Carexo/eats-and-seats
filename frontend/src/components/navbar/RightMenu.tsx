import {Menu, MenuProps} from 'antd';
import { useAuth } from '../../store/hooks.ts';
import { useLogout } from '../../api/queries/auth.ts';
import {UserOutlined} from "@ant-design/icons";
import {RightMenuProps} from "./RightMenu.types.ts";
const RightMenu = (props: { mode: RightMenuProps }) => {
  const auth = useAuth();
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const items: MenuProps['items'] = auth.isLogged ? [
    {
      label: <UserOutlined />,
      key: 'user',
      children: [
        {
          label: <a href="/user/account">Profile</a>,
          key: 'profile'
        },
        {
          label: <a href="/user/orders">Orders</a>,
          key: 'orders'
        },
        {
          label: <a href="/user/opinions">Opinions</a>,
          key: 'opinions'
        }
      ]
    },
    {
      label: <a onClick={handleLogout}>Log out</a>,
      key: 'logout',
      className: "button-important"
    }
  ] : [
    {
      label: <a href="/auth/signin">Sign in</a>,
      key: 'signin'
    },
    {
      label: <a href="/auth/signup">Sign up</a>,
      key: 'signup',
      className: "button-important"
    }
  ];

  return (
      <Menu mode={props.mode} items={items}/>
  )
}
export default RightMenu;