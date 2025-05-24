import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import { routes } from './config/routes';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import { usePermissions } from './hooks/usePermissions';
import LoadingSpinner from './components/common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredPermission }) => {
    const { user, loading } = useAuth();
    const { hasPermission } = usePermissions();

    if (loading) {
        return LoadingSpinner;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/" />;
    }

    return children;
};

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path === '/' ? '' : route.path}
                        element={
                            <ProtectedRoute
                                requiredPermission={route.requiredPermission}
                            >
                                <route.component />
                            </ProtectedRoute>
                        }
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default Router;
