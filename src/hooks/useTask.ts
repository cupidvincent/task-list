import { createTaskApi, deleteTaskApi, updateTaskApi } from '@/services/tasks.service';
import { useMutation } from '@tanstack/react-query';

export const useCreateTask = () => {
    return useMutation({
        mutationFn: createTaskApi,
    });
};

export const useDeleteTask = () => {
    return useMutation({
        mutationFn: (taskId: number) => deleteTaskApi({ taskId }),
    });
};

export const useUpdateTask = () => {
    return useMutation({
        mutationFn: (info: { taskId: number; title: string; description: string }) =>
            updateTaskApi(info),
    });
};
