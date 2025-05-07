// Definice oprávnění pro různé role
export const PERMISSIONS = {
    // Pacienti
    PATIENT_VIEW: 'patient:view',
    PATIENT_CREATE: 'patient:create',
    PATIENT_EDIT: 'patient:edit',

    // Vyšetření
    EXAMINATION_VIEW: 'examination:view',
    EXAMINATION_CREATE: 'examination:create',
    EXAMINATION_EDIT: 'examination:edit',

    // Recepty
    PRESCRIPTION_VIEW: 'prescription:view',
    PRESCRIPTION_CREATE: 'prescription:create',
    PRESCRIPTION_EDIT: 'prescription:edit',

    // Rezervace
    RESERVATION_VIEW: 'reservation:view',
    RESERVATION_CREATE: 'reservation:create',
    RESERVATION_EDIT: 'reservation:edit',
    RESERVATION_DELETE: 'reservation:delete',

    // Schůzky (Appointments)
    APPOINTMENT_VIEW: 'appointment:view',
};

// Definice rolí a jejich oprávnění
export const ROLE_PERMISSIONS = {
    doctor: [
        PERMISSIONS.PATIENT_VIEW,
        PERMISSIONS.PATIENT_CREATE,
        PERMISSIONS.PATIENT_EDIT,
        PERMISSIONS.EXAMINATION_VIEW,
        PERMISSIONS.EXAMINATION_CREATE,
        PERMISSIONS.EXAMINATION_EDIT,
        PERMISSIONS.PRESCRIPTION_VIEW,
        PERMISSIONS.PRESCRIPTION_CREATE,
        PERMISSIONS.PRESCRIPTION_EDIT,
        PERMISSIONS.APPOINTMENT_VIEW,
    ],
    nurse: [
        PERMISSIONS.PATIENT_VIEW,
        PERMISSIONS.PATIENT_CREATE,
        PERMISSIONS.PATIENT_EDIT,
        PERMISSIONS.EXAMINATION_VIEW,
        PERMISSIONS.PRESCRIPTION_VIEW,
        PERMISSIONS.RESERVATION_VIEW,
        PERMISSIONS.RESERVATION_CREATE,
        PERMISSIONS.RESERVATION_EDIT,
        PERMISSIONS.RESERVATION_DELETE,
        PERMISSIONS.APPOINTMENT_VIEW,
    ],
};
