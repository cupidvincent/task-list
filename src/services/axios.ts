import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // ❗ prevent infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('hereeeeeeee');
            if (
                originalRequest.url?.includes('/auth/login') ||
                originalRequest.url?.includes('/auth/refresh')
            ) {
                return Promise.reject(error); // don't retry
            }
            originalRequest._retry = true;

            try {
                // 🔁 call refresh endpoint
                await axiosClient.post('/auth/refresh');

                // ✅ retry original request
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // ❌ refresh failed → logout user
                console.error('Refresh failed', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
