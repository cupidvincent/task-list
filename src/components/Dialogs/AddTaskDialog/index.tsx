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
import { useCreateTask } from '@/hooks/useTask';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { memo, useCallback, useRef, useState } from 'react';

interface AddTaskDialogProps {
    refetch: () => void;
}

const AddTaskDialogComponent = (props: AddTaskDialogProps) => {
    const { refetch } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const { mutateAsync, isPending } = useCreateTask();
    const [open, setOpen] = useState(false);
    const handleCreateTask = useCallback(
        async (e?: React.FormEvent<HTMLFormElement>) => {
            e?.preventDefault();
            if (!formRef.current) return;

            const formData = new FormData(formRef.current);

            const taskData = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                status: 'open',
            };

            try {
                const createResponse = await mutateAsync(taskData);

                if (createResponse) {
                    formRef.current?.reset(); // clear form
                    refetch();
                    setOpen(false);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [mutateAsync, refetch]
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                    <IconPlus /> Create New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form ref={formRef} onSubmit={handleCreateTask}>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                            Make changes to this task here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" required />
                        </Field>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isPending}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="default" type="submit" disabled={isPending}>
                            {isPending ? (
                                <Spinner data-icon="inline-start" />
                            ) : (
                                <IconDeviceFloppy />
                            )}
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export const AddTaskDialog = memo(AddTaskDialogComponent);
