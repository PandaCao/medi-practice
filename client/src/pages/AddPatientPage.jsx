import React, { useState } from 'react';
import AddPatient from '../components/patients/AddPatient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { addPatient } from '../api/patientApi';

function AddPatientPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
            if (error.response && error.response.status === 500) {
                if (error.response.data && error.response.data.error === 'duplicate key value violates unique constraint "patient_card_birth_number_key"') {
                    setModalMessage('Tento pacient již existuje. Pacienta nelze přidat.');
                    setShowModal(true);
                } else {
                    setModalMessage('Došlo k chybě při ukládání pacienta. Zkontrolujte prosím vstupní data.');
                    setShowModal(true);
                }
            }
        }
    };

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
