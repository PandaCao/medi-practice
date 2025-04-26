import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const PrescriptionForm = ({ show, onHide, onSubmit, patient }) => {
    const [formData, setFormData] = useState({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: '',
        prescriptionType: 'regular', // regular or emergency
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            patientId: patient.id,
            date: new Date().toISOString(),
        });
        onHide();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Vytvořit elektronický recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Lék</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="medication"
                                    value={formData.medication}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Dávkování</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dosage"
                                    value={formData.dosage}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Frekvence</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Délka užívání</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Typ receptu</Form.Label>
                        <Form.Select
                            name="prescriptionType"
                            value={formData.prescriptionType}
                            onChange={handleChange}
                        >
                            <option value="regular">Běžný recept</option>
                            <option value="emergency">Nouzový recept</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Poznámky</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
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
