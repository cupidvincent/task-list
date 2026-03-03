import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 bg-gray-100 p-4">
                <Outlet /> {/* Renders nested routes */}
            </main>
        </div>
    );
}
