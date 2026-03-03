import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';

function App() {
    const { isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    return <AppRoutes />;
}

export default App;
