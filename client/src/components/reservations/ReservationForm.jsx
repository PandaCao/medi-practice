import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ExaminationTypeSelect from './ExaminationTypeSelect';
import AvailableSlotsPicker from './AvailableSlotsPicker';
import PatientSearchSelect from './PatientSearchSelect';

function ReservationForm({ formData, onSubmit, onChange, onDateChange }) {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.patientId) {
            newErrors.patientId = 'Prosím vyberte pacienta.';
        }
        if (!formData.examinationType) {
            newErrors.examinationType = 'Prosím vyberte typ vyšetření.';
        }
        if (!formData.duration) {
            newErrors.duration = 'Prosím vyberte délku vyšetření.';
        }
        if (!selectedSlot) {
            newErrors.timeSlot = 'Prosím vyberte dostupný čas.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Ensure we're working with local time
            const localSelectedSlot = new Date(
                selectedSlot.getFullYear(),
                selectedSlot.getMonth(),
                selectedSlot.getDate(),
                selectedSlot.getHours(),
                selectedSlot.getMinutes(),
            );

            await onSubmit({ ...formData, reservationDate: localSelectedSlot });
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrors({
                    submit:
                        error.response.data.error ===
                        'Reservation already exists'
                            ? 'Vybraný čas je již obsazen. Zvolte prosím jiný čas.'
                            : error.response.data.error,
                });
            } else {
                setErrors({
                    submit: 'Rezervace nebyla vytvořena z neznámého důvodu.',
                });
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
        if (errors.patientId) {
            setErrors((prev) => ({ ...prev, patientId: null }));
        }
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        if (errors.timeSlot) {
            setErrors((prev) => ({ ...prev, timeSlot: null }));
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
                <RequiredLabel>Pacient</RequiredLabel>
                <PatientSearchSelect
                    value={formData.patientId}
                    onChange={onChange}
                    onSelect={handlePatientSelect}
                    isInvalid={!!errors.patientId}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.patientId}
                </Form.Control.Feedback>
            </Form.Group>

            <ExaminationTypeSelect
                label={<RequiredLabel>Typ vyšetření</RequiredLabel>}
                value={formData.examinationType}
                onChange={(e) => {
                    onChange(e);
                    if (errors.examinationType) {
                        setErrors((prev) => ({
                            ...prev,
                            examinationType: null,
                        }));
                    }
                }}
                otherValue={formData.otherExaminationType}
                onOtherChange={onChange}
                isInvalid={!!errors.examinationType}
                error={errors.examinationType}
            />

            <Form.Group className="mb-3">
                <RequiredLabel>Datum rezervace</RequiredLabel>
                <Form.Control
                    type="date"
                    name="reservationDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={
                        formData.reservationDate
                            ? formData.reservationDate
                                  .toISOString()
                                  .split('T')[0]
                            : ''
                    }
                    onChange={(e) => {
                        const date = e.target.value
                            ? new Date(e.target.value)
                            : null;
                        onChange({
                            target: { name: 'reservationDate', value: date },
                        });
                        setSelectedSlot(null);
                    }}
                    required
                />
            </Form.Group>

            {formData.reservationDate && (
                <Form.Group className="mb-3">
                    <RequiredLabel>Délka vyšetření (minuty)</RequiredLabel>
                    <Form.Select
                        name="duration"
                        value={formData.duration || ''}
                        onChange={(e) => {
                            onChange(e);
                            setSelectedSlot(null);
                            if (errors.duration) {
                                setErrors((prev) => ({
                                    ...prev,
                                    duration: null,
                                }));
                            }
                        }}
                        required
                        isInvalid={!!errors.duration}
                    >
                        <option value="" disabled>
                            Vyberte délku
                        </option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.duration}
                    </Form.Control.Feedback>
                </Form.Group>
            )}

            {formData.reservationDate && formData.duration && (
                <Form.Group className="mb-3">
                    <Form.Label>Vyberte dostupný čas</Form.Label>
                    <AvailableSlotsPicker
                        selectedDate={formData.reservationDate}
                        duration={parseInt(formData.duration, 10)}
                        selectedSlot={selectedSlot}
                        onSelect={handleSlotSelect}
                        isInvalid={!!errors.timeSlot}
                        error={errors.timeSlot}
                    />
                </Form.Group>
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

            {errors.submit && (
                <div className="alert alert-danger mb-3" role="alert">
                    {errors.submit}
                </div>
            )}

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
