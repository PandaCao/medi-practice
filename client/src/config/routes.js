import PatientsPage from '../pages/PatientsPage';
import AddPatientPage from '../pages/AddPatientPage';
import BloodSamplesPage from '../pages/BloodSamplesPage';
import ReservationsPage from '../pages/ReservationsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import HelpPage from '../pages/HelpPage';
import SettingsPage from '../pages/SettingsPage';
import {
    BsPeople,
    BsGrid,
    BsCalendar,
    BsClock,
    BsQuestionCircle,
    BsGear,
} from 'react-icons/bs';

// Přidáme konstanty pro identifikaci cest
export const ROUTES = {
    PATIENTS: '/',
    PATIENT_ADD: '/patient/add',
    BLOOD_SAMPLES: '/blood-samples',
    RESERVATIONS: '/reservations',
    APPOINTMENTS: '/appointments',
    HELP: '/help',
    SETTINGS: '/settings',
};

export const routes = [
    {
        path: ROUTES.PATIENTS,
        component: PatientsPage,
        name: 'Karty pacientů',
        icon: BsPeople,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: ROUTES.PATIENT_ADD,
        component: AddPatientPage,
        name: 'Přidat pacienta',
        showInSidebar: false,
        isMainRoute: false,
    },
    {
        path: ROUTES.BLOOD_SAMPLES,
        component: BloodSamplesPage,
        name: 'Odběry',
        icon: BsGrid,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: ROUTES.RESERVATIONS,
        component: ReservationsPage,
        name: 'Rezervační systém',
        icon: BsCalendar,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: ROUTES.APPOINTMENTS,
        component: AppointmentsPage,
        name: 'Dnešní schůzky',
        icon: BsClock,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: ROUTES.HELP,
        component: HelpPage,
        name: 'Pomoc',
        icon: BsQuestionCircle,
        showInSidebar: true,
        isMainRoute: true,
        position: 'bottom',
    },
    {
        path: ROUTES.SETTINGS,
        component: SettingsPage,
        name: 'Nastavení',
        icon: BsGear,
        showInSidebar: true,
        isMainRoute: true,
        position: 'bottom',
    },
];

export const getRouteByPath = (path) => {
    return routes.find((route) => route.path === path);
};
