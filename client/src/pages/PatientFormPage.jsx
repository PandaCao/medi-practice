import React from 'react';
//speciální stránka určená pro úpravu údajů o konkrétním pacientovi
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AddPatient from '../components/patients/AddPatient';
import { ROUTES } from '../config/routes';

const PatientFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const patient = location.state?.patient;

    if (!patient) {
        return <div>Pacient nenalezen.</div>;
    }

    // Pomocná funkce pro bezpečné formátování data
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0];
        try {
            return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
            console.error('Invalid date:', dateString);
            return new Date().toISOString().split('T')[0];
        }
    };

    // Připravíme data pro formulář
    const formData = {
        firstName: patient.name.split(' ')[1] || '', // Křestní jméno
        lastName: patient.name.split(' ')[0] || '', // Příjmení
        personalId: patient.personalId || '',
        birthDate: formatDate(patient.dateOfBirth),
        gender: patient.sex || '',
        insuranceCompany: patient.insurance || '',
        registrationDate: formatDate(patient.registrationDate),
        height: patient.height || '',
        weight: patient.weight || '',
        contactPerson: patient.contactPerson || '',
        email: patient.email || '',
        phone: patient.phone || '',
        diagnosisOverview: patient.diagnosis || '',
        anamnesis: patient.anamnesis || '',
        medication: patient.medication || '',
    };

    const handleSubmit = async (data) => {
        try {
            // TODO: Implement API call to update patient
            console.log('Updating patient:', data);
            // Přesměrujeme na detail pacienta
            navigate(ROUTES.PATIENT_DETAIL.replace(':id', id));
        } catch (err) {
            console.error('Error updating patient:', err);
            // Přesměrujeme na detail pacienta i v případě chyby
            navigate(ROUTES.PATIENT_DETAIL.replace(':id', id));
        }
    };

    return (
        <div>
            <AddPatient initialData={formData} onSubmit={handleSubmit} />
        </div>
    );
};

export default PatientFormPage;
