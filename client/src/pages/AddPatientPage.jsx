import React from 'react';
import AddPatient from '../components/patients/AddPatient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { addPatient } from '../api/patientApi';

function AddPatientPage() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            // Formátování data registrace na YYYY-MM-DD
            const formatDate = (dateString) => {
                if (!dateString) return new Date().toISOString().split('T')[0];
                return new Date(dateString).toISOString().split('T')[0];
            };

            // Vytvoříme nového pacienta ve správném formátu pro API
            const newPatient = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                birth_number: formData.personalId,
                date_of_birth: formatDate(formData.birthDate),
                sex: formData.gender,
                insurance_id: formData.insuranceCompany,
                contact_info: {
                    contact_phone: formData.phone || null,
                    contact_email: formData.email || null,
                },
                height: formData.height ? parseInt(formData.height) : null,
                weight: formData.weight ? parseInt(formData.weight) : null,
            };

            console.log(
                'Sending patient data to server:',
                JSON.stringify(newPatient, null, 2),
            );

            // Voláme API pro přidání pacienta
            await addPatient(newPatient);
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
