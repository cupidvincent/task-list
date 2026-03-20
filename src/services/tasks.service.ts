import { axiosClient } from './axios';

export const getTasksApi = async () => {
    const { data } = await axiosClient.get('/tasks');
    return data;
};

export const createTaskApi = async (taskDetails: {
    title: string;
    status: string;
    description?: string;
}) => {
    const { data } = await axiosClient.post('/tasks', taskDetails);
    return data;
};

export const deleteTaskApi = async ({ taskId }: { taskId: number }) => {
    if (!taskId || typeof taskId !== 'number') {
        throw new Error('Invalid taskId');
    }
    const { data } = await axiosClient.delete('/tasks', { params: { taskId } });
    return data;
};

export const updateTaskApi = async ({
    taskId,
    title,
    description,
}: {
    taskId: number;
    title: string;
    description: string;
}) => {
    if (!taskId || typeof taskId !== 'number') {
        throw new Error('Invalid taskId');
    }

    const { data } = await axiosClient.patch(`/tasks/${taskId}`, {
        title,
        description,
        status: 'open',
    });

    return data;
};
