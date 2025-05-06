import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import { routes } from './config/routes';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
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
                        element={<route.component />}
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default Router;
