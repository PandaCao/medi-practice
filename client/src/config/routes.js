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

export const routes = [
    {
        path: '/',
        component: PatientsPage,
        name: 'Karty pacientů',
        icon: BsPeople,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: '/add-patient',
        component: AddPatientPage,
        name: 'Přidat pacienta',
        showInSidebar: false,
        isMainRoute: false,
    },
    {
        path: '/blood-samples',
        component: BloodSamplesPage,
        name: 'Odběry',
        icon: BsGrid,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: '/reservations',
        component: ReservationsPage,
        name: 'Rezervační systém',
        icon: BsCalendar,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: '/appointments',
        component: AppointmentsPage,
        name: 'Dnešní schůzky',
        icon: BsClock,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
    },
    {
        path: '/help',
        component: HelpPage,
        name: 'Pomoc',
        icon: BsQuestionCircle,
        showInSidebar: true,
        isMainRoute: true,
        position: 'bottom',
    },
    {
        path: '/settings',
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
