import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen w-screen bg-slate-100 p-20 flex justify-center items-center m-auto">
            <Progress value={progress} />
        </div>
    );
}
