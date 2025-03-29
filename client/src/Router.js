import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import PatientsPage from './pages/PatientsPage';
import AddPatientPage from './pages/AddPatientPage';
import BloodSamplesPage from './pages/BloodSamplesPage';
import ReservationsPage from './pages/ReservationsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PatientsPage />} />
                <Route path="/add-patient" element={<AddPatientPage />} />
                <Route path="/blood-samples" element={<BloodSamplesPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
