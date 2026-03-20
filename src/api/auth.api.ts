import { apiClient } from './client';

export const loginApi = (email: string, password: string) => {
    return apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const logoutApi = () => {
    return apiClient('/auth/logout', {
        method: 'POST',
    });
};

export const signUpApi = (data: {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
}) => {
    return apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
