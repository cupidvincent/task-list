import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export const useCheckAuth = () => {
    const { login, logout, setAuthState } = useAuthStore();

    const query = useQuery({
        queryKey: ['auth'],
        queryFn: profileApi,
        retry: false,
    });

    useEffect(() => {
        if (query.isSuccess) {
            login(query.data);
            setAuthState(true);
        }

        if (query.isError) {
            logout();
            setAuthState(false);
        }
    }, [query.isSuccess, query.isError]);

    return query;
};
