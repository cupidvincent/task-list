import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Layout from '../components/Layout';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
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
