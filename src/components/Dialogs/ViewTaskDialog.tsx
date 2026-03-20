import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteTask, useUpdateTask } from '@/hooks/useTask';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import { memo, useCallback, useRef, useState } from 'react';
import { CommonDialog } from './CommonDialog';

interface ViewTaskDialogProps {
    task: { id: number; title: string; description?: string };
    refetch: () => void;
    // isLoading: boolean;
}
type DialogType = 'confirmDelete' | 'saveChanges' | 'unsavedChanges';
const hasChanges = (oldInfo: any, newInfo: any) => {
    return oldInfo?.title !== newInfo?.title || oldInfo?.description !== newInfo?.description;
};

const ViewTaskDialogComponent = (props: ViewTaskDialogProps) => {
    const { task, refetch } = props;
    const { mutateAsync, isPending } = useDeleteTask();
    const { mutateAsync: updateMutateAsync, isPending: updateIsPending } = useUpdateTask();

    const formRef = useRef<HTMLFormElement>(null);
    const [temp, setTemp] = useState(task);
    const [open, setConfirm] = useState(false);
    const [modalType, setModalType] = useState<DialogType>('confirmDelete');
    const handleDeleteTask = useCallback(
        async (e: React.FormEvent<HTMLFormElement>, taskId: number) => {
            console.log({ e, taskId });
            e?.preventDefault();

            try {
                const deleteResponse = await mutateAsync(taskId);
                console.log({ deleteResponse });
                if (deleteResponse) {
                    refetch();
                }
            } catch (error) {
                console.error(error);
            }
        },
        [mutateAsync, refetch]
    );

    const handleUpdateTask = useCallback(
        async (e?: React.FormEvent<HTMLFormElement>) => {
            e?.preventDefault();

            if (!formRef.current) return;

            const formData = new FormData(formRef.current);
            const taskData = {
                taskId: task.id,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
            };

            try {
                const createResponse = await updateMutateAsync(taskData);

                if (createResponse) {
                    formRef.current?.reset(); // clear form
                    refetch();
                }
            } catch (error) {
                console.error(error);
            }
        },
        [updateMutateAsync, refetch, task.id]
    );

    return (
        <Dialog>
            <CommonDialog
                type={modalType}
                confirm={(e: any) => {
                    if (modalType === 'confirmDelete') handleDeleteTask(e, task.id);
                    if (modalType === 'unsavedChanges') {
                        setTemp(task);
                        setConfirm(false);
                    }
                }}
                isLoading={isPending}
                open={open}
                setOpen={function (newStatus: boolean): void {
                    setConfirm(newStatus);
                }}
            />
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form ref={formRef} onSubmit={handleUpdateTask}>
                    <DialogHeader>
                        <DialogTitle>{task.title}</DialogTitle>
                        <DialogDescription>
                            Make changes to this task here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={temp.title}
                                onChange={e => setTemp({ ...temp, title: e.target.value })}
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                value={temp?.description || ''}
                                onChange={e => setTemp({ ...temp, description: e.target.value })}
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-3">
                        {hasChanges(task, temp) ? (
                            <Button
                                type="button"
                                variant="outline"
                                // disabled={props.isLoading}
                                onClick={() => {
                                    setModalType('unsavedChanges');
                                    setConfirm(true);
                                }}
                            >
                                Close
                            </Button>
                        ) : (
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    // disabled={props.isLoading}
                                >
                                    Close
                                </Button>
                            </DialogClose>
                        )}

                        <Button
                            type="button"
                            variant="destructive"
                            // onClick={(e: any) => handleDeleteTask(e, task.id)}
                            onClick={() => {
                                setModalType('confirmDelete');
                                setConfirm(true);
                            }}
                            disabled={isPending}
                        >
                            {' '}
                            {isPending ? <Spinner /> : <IconTrash />}
                            Delete
                        </Button>

                        {hasChanges(task, temp) ? (
                            <Button disabled={isPending} type="submit">
                                {' '}
                                {isPending ? <Spinner /> : <IconDeviceFloppy />}
                                Save Changes
                            </Button>
                        ) : null}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export const ViewTaskDialog = memo(ViewTaskDialogComponent);
