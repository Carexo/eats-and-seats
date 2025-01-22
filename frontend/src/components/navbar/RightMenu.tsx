import {useEffect} from "react";
import {Menu} from "antd";
import {useActions, useAuth} from "../../store/hooks.ts";
import {useCheckLoggedStatus, useLogout} from "../../api/queries/auth.ts";
import {useGetInitCart} from "../../hooks/cart/useGetInitCart.ts";

const RightMenu = (props) => {

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
        <Menu mode={props.mode}>
            {auth.isLogged ? (
                <>
                    <Menu.Item className={"button-important"}>
                        <a onClick={handleLogout}>Log out</a>
                    </Menu.Item></>
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