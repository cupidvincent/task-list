import { AddTaskDialog } from '@/components/Dialogs/AddTaskDialog';
import { ViewTaskDialog } from '@/components/Dialogs/ViewTaskDialog';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { getTasksApi } from '@/services/tasks.service';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
    const { data: tasks, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasksApi,
        retry: true,
        refetchOnWindowFocus: true,
    });

    return (
        <div>
            <Accordion type="single" collapsible defaultValue="shipping" className="max-w-lg">
                {tasks?.map((task: any) => (
                    <AccordionItem value={task.title} key={task.id}>
                        <AccordionTrigger>{task.title}</AccordionTrigger>
                        <AccordionContent className="max-w-lg">
                            <div className="flex flex-col">
                                <p>{task.description}</p>
                                <div>
                                    <ViewTaskDialog task={task} refetch={refetch} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <AddTaskDialog refetch={refetch} />
        </div>
    );
}
