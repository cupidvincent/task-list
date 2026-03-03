import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import SideBar from './SideBar';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 bg-gray-100 p-4">
                <Outlet /> {/* Renders nested routes */}
            </main>
        </div>
    );
};
