import {Menu} from "antd";
import {useAuth} from "../../store/hooks.ts";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

const LeftMenu = (props: { mode: MenuProps['mode'] | undefined; }) => {
    const auth = useAuth();

    const items: MenuProps['items'] = [
        {
            label: <Link to="/menu">Menu</Link>,
            key: 'menu',
        },
        ...(auth.isLogged && auth.role === 'admin' ? [{
            label: <Link to="/admin">Dashboard</Link>,
            key: 'admin',
        }] : [])
    ];

    return (
        <Menu mode={props.mode} items={items}/>
    );
}

export default LeftMenu;