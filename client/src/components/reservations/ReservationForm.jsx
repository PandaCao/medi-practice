import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ExaminationTypeSelect from './ExaminationTypeSelect';
import DateTimePickerField from './DateTimePickerField';

function ReservationForm({ formData, onSubmit, onChange, onDateChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>ID pacienta</Form.Label>
                <Form.Control
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={onChange}
                    required
                />
            </Form.Group>

            <ExaminationTypeSelect
                value={formData.examinationType}
                onChange={onChange}
            />

            <DateTimePickerField
                selected={formData.reservationDate}
                onChange={onDateChange}
            />

            <Form.Group className="mb-3">
                <Form.Label>Poznámky</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={onChange}
                />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                    backgroundColor: '#0D6EFD',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                Vytvořit rezervaci
            </Button>
        </Form>
    );
}

export default ReservationForm;
