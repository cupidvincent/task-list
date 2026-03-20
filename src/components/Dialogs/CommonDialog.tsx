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

type DialogType = 'confirmDelete' | 'saveChanges' | 'unsavedChanges';

interface CommonDialogProps {
    type: DialogType;

    confirm: (e?: any) => void;
    isLoading: boolean;
    open: boolean;
    setOpen: (newStatus: boolean) => void;
}

function getModalTitle(type: DialogType): string {
    switch (type) {
        case 'confirmDelete':
            return 'Confirm Delete';
        case 'unsavedChanges':
            return 'Unsaved Changes';
        default:
            return '';
    }
}

function getModalDescription(type: DialogType): string {
    switch (type) {
        case 'confirmDelete':
            return 'Deleting this task will erase it permanently and cannot be restored.';
        case 'unsavedChanges':
            return 'There are unsaved changes, are you sure you want to discard the changes?';
        default:
            return '';
    }
}

export function CommonDialog({ type, confirm, isLoading, open, setOpen }: CommonDialogProps) {
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{getModalTitle(type)}</DialogTitle>
                </DialogHeader>

                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    {getModalDescription(type)}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="outline"
                        onClick={() => {
                            confirm();
                            setOpen(false);
                        }}
                        disabled={isLoading}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
