import { useAuth } from '@/hooks/useAuth';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    const { user, isLoading } = useAuth();

    return (
        <div className="flex min-h-screen">
            <SideBar name={`${user?.first_name} ${user?.last_name}`} email={user?.email} />
            <main
                className={`flex-1 bg-gray-100 p-${isLoading ? 0 : 4} flex items-center justify-center w-full`}
            >
                <Outlet /> {/* Renders nested routes */}
            </main>
        </div>
    );
}
