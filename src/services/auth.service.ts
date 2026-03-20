import { axiosClient } from './axios';

export const loginApiV2 = async (credentials: { email: string; password: string }) => {
    const { data } = await axiosClient.post('/auth/login', credentials);
    return data;
};

export const profileApi = async () => {
    const { data } = await axiosClient.get('/auth/details');
    return data;
};
