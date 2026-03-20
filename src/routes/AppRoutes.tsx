import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Login';
import Layout from '../components/Layout';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Protected routes with sidebar layout */}
            <Route element={<ProtectedRoutes />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}
