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
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">Vytvoření nové rezervace</h2>
            <ReservationForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onDateChange={handleDateChange}
            />
        </Container>
    );
}

export default ReservationsPage;
