import React, { useState } from 'react';
import AddPatient from '../components/patients/AddPatient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { addPatient } from '../api/patientApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

function AddPatientPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setIsLoading(true);
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
                created_at: formatDate(formData.registrationDate),
                birth_number: formData.personalId,
                date_of_birth: formatDate(formData.birthDate),
                sex: formData.gender,
                insurance_id: formData.insuranceCompany,
                contact_info: {
                    contact_person: {
                        name: formData.contactPersonName || '',
                        phone: formData.contactPersonPhone || '',
                    },
                    contact_email: formData.email || '',
                    contact_phone: formData.phone || '',
                },
                address: {
                    street: formData.addressStreet || '',
                    city: formData.addressCity || '',
                    zip: formData.addressZip || '',
                },
                height: formData.height ? parseInt(formData.height) : null,
                weight: formData.weight ? parseInt(formData.weight) : null,
            };

            await addPatient(newPatient);
            setModalMessage('Pacient byl úspěšně přidán!');
            setShowModal(true);
            setTimeout(() => {
                navigate(ROUTES.PATIENTS);
            }, 2000);
        } catch (error) {
            setModalMessage('Chyba při přidávání pacienta: ' + error.message);
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner message="Ukládání pacienta..." />;
    }

    return (
        <>
            <AddPatient onSubmit={handleSubmit} />

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Upozornění</h5>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddPatientPage;
