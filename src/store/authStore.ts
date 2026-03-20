import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    setAuthState: (isAuthenticated: boolean) => void;
    isLoading: boolean;
    setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        set => ({
            user: null,
            isAuthenticated: false,

            login: (userData: User) => set({ user: userData, isAuthenticated: true }),

            logout: () => set({ user: null, isAuthenticated: false }),

            setAuthState: (isAuthenticated: boolean) => set({ isAuthenticated }),

            isLoading: true,

            setLoading: (value: boolean) => set({ isLoading: value }),
        }),
        { name: 'AuthStore' }
    )
);
