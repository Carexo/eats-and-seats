import { useQuery} from '@tanstack/react-query';
import { getUsers} from '../services/users';

type User = {
    _id: string,
    username: string,
    email: string,
};

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: true,}
    );
};