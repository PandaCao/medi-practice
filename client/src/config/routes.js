// config/routes.js
import PatientsPage from '../pages/PatientsPage';
import AddPatientPage from '../pages/AddPatientPage';
import PatientDetailPage from '../pages/PatientDetailPage'; // ✅ Pridaný nový detail pacienta
import PatientFormPage from '../pages/PatientFormPage'; // ✅ Editacní formulář
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
import { PERMISSIONS } from './permissions';

// Definice rout
export const ROUTES = {
    PATIENTS: '/',
    PATIENT_ADD: '/patient/add',
    PATIENT_DETAIL: '/patient/:id', // ✅ Detail pacienta (dashboard)
    PATIENT_EDIT: '/patient/:id/edit', // ✅ Formulář pro úpravu
    BLOOD_SAMPLES: '/blood-samples',
    RESERVATIONS: '/reservations',
    APPOINTMENTS: '/appointments',
    HELP: '/help',
    SETTINGS: '/settings',
};

// Pole pro mapování rout a jejich komponent
export const routes = [
    {
        path: ROUTES.PATIENTS,
        component: PatientsPage,
        name: 'Karty pacientů',
        icon: BsPeople,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
        requiredPermission: PERMISSIONS.PATIENT_VIEW,
    },
    {
        path: ROUTES.PATIENT_ADD,
        component: AddPatientPage,
        name: 'Přidat pacienta',
        showInSidebar: false,
        isMainRoute: false,
        requiredPermission: PERMISSIONS.PATIENT_CREATE,
    },
    {
        path: ROUTES.PATIENT_DETAIL, // ✅ Zobrazení detailu pacienta
        component: PatientDetailPage,
        name: 'Detail pacienta',
        showInSidebar: false,
        isMainRoute: false,
        requiredPermission: PERMISSIONS.PATIENT_VIEW,
    },
    {
        path: ROUTES.PATIENT_EDIT, // ✅ Editace pacienta
        component: PatientFormPage,
        name: 'Editace pacienta',
        showInSidebar: false,
        isMainRoute: false,
        requiredPermission: PERMISSIONS.PATIENT_EDIT,
    },
    {
        path: ROUTES.BLOOD_SAMPLES,
        component: BloodSamplesPage,
        name: 'Odběry',
        icon: BsGrid,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
        requiredPermission: PERMISSIONS.EXAMINATION_VIEW,
    },
    {
        path: ROUTES.RESERVATIONS,
        component: ReservationsPage,
        name: 'Rezervační systém',
        icon: BsCalendar,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
        requiredPermission: PERMISSIONS.RESERVATION_VIEW,
    },
    {
        path: ROUTES.APPOINTMENTS,
        component: AppointmentsPage,
        name: 'Dnešní schůzky',
        icon: BsClock,
        showInSidebar: true,
        isMainRoute: true,
        position: 'top',
        requiredPermission: PERMISSIONS.RESERVATION_VIEW,
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

// Funkce pro nalezení route podle cesty
export const getRouteByPath = (path) => {
    // Nejdřív zkusíme najít přesnou shodu
    const exactMatch = routes.find((route) => route.path === path);
    if (exactMatch) return exactMatch;

    // Pokud nenajdeme přesnou shodu, zkusíme najít dynamickou cestu
    return routes.find((route) => {
        // Převedeme pattern na regex
        const pattern = route.path.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(path);
    });
};
