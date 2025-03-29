import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Patients from './pages/Patients';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Patients />} />
            </Route>
        </Routes>
    );
};

export default Router;
