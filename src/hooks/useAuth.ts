import { useEffect } from 'react';
import { logoutApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { loginApiV2 } from '@/services/auth.service';
import { useCheckAuth } from './useCheckAuth';

export const useAuth = () => {
    const { user, isAuthenticated, login, logout, setLoading, isLoading } = useAuthStore();

    const { refetch } = useCheckAuth();

    const mutationLogin = useMutation({
        mutationFn: loginApiV2,
        onSuccess: data => {
            return data;
        },
        onError: error => {
            console.log('Login failed', error);
            return error;
        },
    });

    const loginHook = async (email: string, password: string) => {
        const res = await mutationLogin.mutateAsync({
            email: email,
            password: password,
        });
        login(res);
        return res;
    };

    const logoutHook = async () => {
        await logoutApi();
        logout();
    };

    // const checkAuth = async () => {
    //     try {
    //         const profile = await apiClient('/auth/details');
    //         login(profile);
    //         console.log({ profile });
    //         setAuthState(true);
    //     } catch {
    //         logout();
    //         setAuthState(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const check = async () => {
        await refetch();
        setLoading(false);
    };

    useEffect(() => {
        check();
    }, []);

    return {
        user,
        isAuthenticated,
        loginHook,
        logoutHook,
        isLoading,
        checkAuth: refetch,
    };
};
