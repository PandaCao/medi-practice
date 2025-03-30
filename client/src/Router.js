import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { routes } from './config/routes';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
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
