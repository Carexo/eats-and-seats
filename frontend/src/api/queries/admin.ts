import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/admin.ts';
import {ActionsContextType} from "../../store/types.ts";
import {useNavigate} from "react-router";



export const useChangePassword = (
    notification: ActionsContextType['notificationSend'], storeLogin: ActionsContextType['loginUser'],) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            storeLogin(data.data.username)
            notification('success', {
                title: 'Changed successfully',
                description: 'You have successfully changed your password.',
            });

            setTimeout(() => {
                navigate(`/admin/account`);
            }, 1500);
        },
        onError: (error) => {
            notification('error', {
                title: 'Operation failed',
                description: error.message,
            });
        },
    });
};
