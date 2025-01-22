import {useEffect} from "react";
import {Menu} from "antd";
import {useActions, useAuth} from "../../store/hooks.ts";
import {useCheckLoggedStatus, useLogout} from "../../api/queries/auth.ts";
import {useGetInitCart} from "../../hooks/cart/useGetInitCart.ts";
import type { MenuProps } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const RightMenu = (props: { mode: MenuProps['mode'] | undefined; }) => {

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