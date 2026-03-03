import { useEffect } from 'react';
import { logoutApi, loginApi } from '../api/auth.api';
import { apiClient } from '../api/client';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
    const { user, isAuthenticated, login, logout, setAuthState, setLoading, isLoading } =
        useAuthStore();

    const loginHook = async (email: string, password: string) => {
        const res = await loginApi(email, password);
        console.log({ res });
        // const profile = await getProfileApi();
        login(res);
        return res;
    };

    const logoutHook = async () => {
        await logoutApi();
        logout();
    };

    const checkAuth = async () => {
        try {
            const profile = await apiClient('/auth/details');
            login(profile);
            setAuthState(true);
        } catch {
            logout();
            setAuthState(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        user,
        isAuthenticated,
        loginHook,
        logoutHook,
        checkAuth,
        isLoading,
    };
};
