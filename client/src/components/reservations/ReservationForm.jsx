import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ExaminationTypeSelect from './ExaminationTypeSelect';
import AvailableSlotsPicker from './AvailableSlotsPicker';
import PatientSearchSelect from './PatientSearchSelect';

function ReservationForm({ formData, onSubmit, onChange, onDateChange }) {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedSlot) {
                alert('Prosím vyberte dostupný čas.');
                return;
            }
            await onSubmit({ ...formData, reservationDate: selectedSlot });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`${error.response.data.error === 'Reservation already exists' ? 'Vybraný čas je již obsazen. Zvolte prosím jiný čas.' : error.response.data.error}`);
            } else {
                alert('Rezervace nebyla vytvořena z neznámého důvodu.');
            }
        }
    };

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    const handlePatientSelect = (patient) => {
        onChange({
            target: {
                name: 'patientId',
                value: patient.id,
            },
        });
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <RequiredLabel>Pacient</RequiredLabel>
                <PatientSearchSelect
                    value={formData.patientId}
                    onChange={onChange}
                    onSelect={handlePatientSelect}
                />
            </Form.Group>

            <ExaminationTypeSelect
                value={formData.examinationType}
                onChange={onChange}
                otherValue={formData.otherExaminationType}
                onOtherChange={onChange}
            />

            <Form.Group className="mb-3">
                <Form.Label>Datum rezervace</Form.Label>
                <Form.Control
                    type="date"
                    name="reservationDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.reservationDate ? formData.reservationDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        onChange({ target: { name: 'reservationDate', value: date } });
                        setSelectedSlot(null);
                    }}
                    required
                />
            </Form.Group>

            {formData.reservationDate && (
                <Form.Group className="mb-3">
                    <Form.Label>Délka vyšetření (minuty)</Form.Label>
                    <Form.Select
                        name="duration"
                        value={formData.duration || ''}
                        onChange={(e) => {
                            onChange(e);
                            setSelectedSlot(null);
                        }}
                        required
                    >
                        <option value="" disabled>Vyberte délku</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </Form.Select>
                </Form.Group>
            )}

            {formData.reservationDate && formData.duration && (
                <AvailableSlotsPicker
                    selectedDate={formData.reservationDate}
                    duration={parseInt(formData.duration, 10)}
                    selectedSlot={selectedSlot}
                    onSelect={handleSlotSelect}
                />
            )}

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
