import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const defaultFormData = {
    medications: [
        {
            name: '',
            dosage: '',
            frequency: '',
            duration: '',
        },
    ],
    notes: '',
};

const PrescriptionForm = ({ show, onHide, onSubmit, patient }) => {
    const [formData, setFormData] = useState(defaultFormData);

    // Reset formuláře při otevření modalu
    React.useEffect(() => {
        if (show) {
            setFormData(defaultFormData);
        }
    }, [show]);

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;
        const newMedications = [...formData.medications];
        newMedications[index] = {
            ...newMedications[index],
            [name]: value,
        };
        setFormData((prev) => ({
            ...prev,
            medications: newMedications,
        }));
    };

    const handleAddMedication = () => {
        setFormData((prev) => ({
            ...prev,
            medications: [
                ...prev.medications,
                { name: '', dosage: '', frequency: '', duration: '' },
            ],
        }));
    };

    const handleRemoveMedication = (index) => {
        setFormData((prev) => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index),
        }));
    };

    const handleNotesChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            notes: e.target.value,
        }));
    };

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const defaultDoctorId = 'd6574103-a485-4eba-a536-d4dcbb3f2077';
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // default 7 days
        const prescriptionPayload = {
            patient_id: patient.id,
            doctor_id: defaultDoctorId,
            expiration_date: expirationDate.toISOString(),
            medications: formData.medications,
            notes: formData.notes,
        };
        onSubmit(prescriptionPayload);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Vytvořit elektronický recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {formData.medications.map((medication, index) => (
                        <div key={index} className="border rounded p-3 mb-3">
                            <Form.Group className="mb-3">
                                <RequiredLabel>Lék</RequiredLabel>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={medication.name}
                                    onChange={(e) =>
                                        handleMedicationChange(index, e)
                                    }
                                    required
                                    placeholder="např. Paracetamol"
                                    maxLength={50}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <RequiredLabel>Dávkování</RequiredLabel>
                                <Form.Control
                                    type="text"
                                    name="dosage"
                                    value={medication.dosage}
                                    onChange={(e) =>
                                        handleMedicationChange(index, e)
                                    }
                                    required
                                    placeholder="např. 1 tableta"
                                    maxLength={50}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <RequiredLabel>Frekvence</RequiredLabel>
                                <Form.Control
                                    type="text"
                                    name="frequency"
                                    value={medication.frequency}
                                    onChange={(e) =>
                                        handleMedicationChange(index, e)
                                    }
                                    required
                                    placeholder="např. 3x denně"
                                    maxLength={50}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <RequiredLabel>Délka užívání</RequiredLabel>
                                <Form.Control
                                    type="text"
                                    name="duration"
                                    value={medication.duration}
                                    onChange={(e) =>
                                        handleMedicationChange(index, e)
                                    }
                                    required
                                    placeholder="např. 7 dní"
                                    maxLength={50}
                                />
                            </Form.Group>
                            {formData.medications.length > 1 && (
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        handleRemoveMedication(index)
                                    }
                                    className="mb-3"
                                >
                                    Odebrat lék
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        variant="outline-primary"
                        onClick={handleAddMedication}
                        className="mb-3"
                    >
                        Přidat další lék
                    </Button>
                    <Form.Group className="mb-3">
                        <Form.Label>Poznámky</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={formData.notes}
                            onChange={handleNotesChange}
                            placeholder="Doplňující informace k e-receptu"
                            maxLength={300}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Zrušit
                        </Button>
                        <Button variant="primary" type="submit">
                            Vytvořit recept
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PrescriptionForm;
