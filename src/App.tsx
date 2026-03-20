import { LoadingScreen } from './components/LoadingScreen';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';

function App() {
    const { isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    return <AppRoutes />;
}

export default App;
