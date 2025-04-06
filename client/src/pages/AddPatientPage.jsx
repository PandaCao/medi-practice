import React from 'react';
import AddPatient from '../components/patients/AddPatient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { patients } from '../data/patients'; // Import patients array

function AddPatientPage() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            // Formátování data registrace na DD/MM/YYYY
            const formatDate = (dateString) => {
                if (!dateString) {
                    const today = new Date();
                    return `${String(today.getDate()).padStart(
                        2,
                        '0',
                    )}/${String(today.getMonth() + 1).padStart(
                        2,
                        '0',
                    )}/${today.getFullYear()}`;
                }
                const date = new Date(dateString);
                return `${String(date.getDate()).padStart(2, '0')}/${String(
                    date.getMonth() + 1,
                ).padStart(2, '0')}/${date.getFullYear()}`;
            };

            // Vytvoříme nového pacienta ve správném formátu
            const newPatient = {
                registrationDate: formatDate(formData.registrationDate),
                name: `${formData.lastName} ${formData.firstName}`,
                personalId: formData.personalId,
                birthDate: formatDate(formData.birthDate),
                gender: formData.gender,
                insurance: formData.insuranceCompany,
                email: formData.email || null,
                phone: formData.phone || null,
                height: formData.height || null,
                weight: formData.weight || null,
                contactPerson: formData.contactPerson || null,
                diagnosisOverview: formData.diagnosisOverview || null,
                anamnesis: formData.anamnesis || null,
                medication: formData.medication || null,
            };

            // Přidáme nového pacienta do pole patients
            patients.push(newPatient);
            console.log('Pacient byl úspěšně přidán:', newPatient);

            // Po úspěšném uložení přesměrujeme na seznam pacientů
            navigate(ROUTES.PATIENTS);
        } catch (error) {
            console.error('Chyba při ukládání pacienta:', error);
            // Zde můžete přidat zobrazení chybové hlášky uživateli
        }
    };

    return <AddPatient onSubmit={handleSubmit} />;
}

export default AddPatientPage;
