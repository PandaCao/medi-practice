import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReservationForm from '../components/reservations/ReservationForm';

function ReservationsPage() {
    const [formData, setFormData] = useState({
        patientId: '',
        examinationType: '',
        reservationDate: new Date(),
        notes: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            reservationDate: date,
        }));
    };

    const handleSubmit = async (formData) => {
        try {
            // TODO: Implement API call to save reservation
            console.log('Form submitted:', formData);

            //Message box - Form subbmited
            setModalMessage('Rezervace byla úspěšně vytvořená!');
            setShowModal(true);
        } catch (error) {
            console.error('Error creating reservation:', error);

            // TODO: Message box - Form submitted
            setModalMessage('Rezervace nebyla vytvořená.');
            setShowModal(true);
        }
    };

    return (

        <>
            <Container className="py-4">
                <h2 className="mb-4">Vytvoření nové rezervace</h2>
                <ReservationForm
                    formData={formData}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onDateChange={handleDateChange}
                />
            </Container>

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

export default ReservationsPage;
