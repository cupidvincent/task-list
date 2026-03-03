import { create } from 'zustand';

interface User {
    name: string;
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

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    isAuthenticated: false,
    login: (userData: User | null) => set({ user: userData }),
    logout: () => set({ user: null }),
    setAuthState: (isAuthenticated: boolean) => set({ isAuthenticated }),
    isLoading: true, // important
    setLoading: value => set({ isLoading: value }),
}));
