import { apiClient } from './client';

export const createTask = ({
    title,
    description,
    status,
}: {
    title: string;
    status: string;
    description?: string;
}) => {
    return apiClient('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description, status }),
    });
};
