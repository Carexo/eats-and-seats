import {Menu} from "antd";
import {useAuth} from "../store/hooks.ts";




const LeftMenu = (props) => {

    const auth = useAuth();



    return (
        <Menu mode={props.mode}>
            <Menu.Item>
                <a href="/menu">Menu</a>
            </Menu.Item>
            {auth.isLogged && auth.role === 'admin' && (
                <Menu.Item>
                    <a href="/admin">Dashboard</a>
                </Menu.Item>
            )
            }
        </Menu>
    )
}

export default LeftMenu;