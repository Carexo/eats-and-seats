import {useEffect} from "react";
import {Menu} from "antd";
import {useActions, useAuth} from "../../store/hooks.ts";
import {useCheckLoggedStatus, useLogout} from "../../api/queries/auth.ts";
import {useGetInitCart} from "../../hooks/cart/useGetInitCart.ts";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const RightMenu = (props) => {

    const { loginUser, logoutUser, notificationSend } = useActions();
    const userStatusMutation = useCheckLoggedStatus(loginUser);
    const getCart = useGetInitCart();
    const navigate = useNavigate();

    const auth = useAuth();

    const logoutMutation = useLogout(notificationSend, logoutUser);

    const handleLogout = () => {
        logoutMutation.mutate();
        navigate('/');
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
        <Menu mode={props.mode}>
            {auth.isLogged ? (
                <SubMenu title={<UserOutlined/>} className={"button-important"} style={{textAlign:'center', alignItems:'center'}}>
                    <Menu.Item>
                        <a href="/user/account">Profile</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="/user/orders">Orders</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="/user/opinions">Opinions</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={handleLogout}>Log out</a>
                    </Menu.Item>
                </SubMenu>
            ) : (<><Menu.Item>
                    <a href="/auth/signin">Sign in</a>
                </Menu.Item>
                    <Menu.Item className={"button-important"}>
                        <a href="/auth/signup">Sign up</a>
                    </Menu.Item></>
            )}

        </Menu>
    )
}

export default RightMenu;