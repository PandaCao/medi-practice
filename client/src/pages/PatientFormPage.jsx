import React, { useState } from 'react';
//speciální stránka určená pro úpravu údajů o konkrétním pacientovi
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AddPatient from '../components/patients/AddPatient';
import { ROUTES } from '../config/routes';
import { patientApi } from '../api';

const PatientFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const patient = location.state?.patient;
    const [updateError, setUpdateError] = useState(null);

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
        firstName: patient.first_name || '',
        lastName: patient.last_name || '',
        personalId: patient.personalId || '',
        birthDate: formatDate(patient.dateOfBirth),
        gender: patient.sex || '',
        insuranceCompany: patient.insurance || '',
        registrationDate: formatDate(patient.registrationDate),
        height: patient.height || '',
        weight: patient.weight || '',
        contactPersonName:
            patient.contact_info?.contact_person?.name ||
            patient.contact_info?.contact_person_name ||
            '',
        contactPersonPhone:
            patient.contact_info?.contact_person?.phone ||
            patient.contact_info?.contact_person_phone ||
            '',
        email: patient.contact_info?.contact_email || patient.email || '',
        phone: patient.contact_info?.contact_phone || patient.phone || '',
        addressStreet: patient.address?.street || '',
        addressCity: patient.address?.city || '',
        addressZip: patient.address?.zip || '',
    };

    const handleSubmit = async (data) => {
        setUpdateError(null);
        try {
            // Připravím data pro API (včetně id)
            const payload = {
                id: patient.id || patient.user_id || id,
                first_name: data.firstName,
                last_name: data.lastName,
                created_at: formatDate(data.registrationDate),
                birth_number: data.personalId,
                date_of_birth: data.birthDate,
                sex: data.gender,
                insurance_id: data.insuranceCompany,
                weight: data.weight ? parseInt(data.weight) : null,
                height: data.height ? parseInt(data.height) : null,
                contact_info: {
                    contact_person_name: data.contactPersonName,
                    contact_person_phone: data.contactPersonPhone,
                    contact_email: data.email,
                    contact_phone: data.phone,
                },
                address: {
                    street: data.addressStreet,
                    city: data.addressCity,
                    zip: data.addressZip,
                },
            };
            await patientApi.updatePatient(payload);
            // navigate(ROUTES.PATIENT_DETAIL.replace(':id', payload.id), { replace: true });
            navigate(ROUTES.PATIENT_DETAIL.replace(':id', payload.id));
        } catch (err) {
            setUpdateError(
                'Nepodařilo se uložit změny: ' +
                    (err?.response?.data?.error || err.message),
            );
        }
    };

    return (
        <div>
            {updateError && (
                <div className="alert alert-danger" role="alert">
                    {updateError}
                </div>
            )}
            <AddPatient initialData={formData} onSubmit={handleSubmit} />
        </div>
    );
};

export default PatientFormPage;
