import { EnvConfig } from '../configs/EnvValues';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${EnvConfig.API_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error('API Error');
    }

    return response.json();
};
