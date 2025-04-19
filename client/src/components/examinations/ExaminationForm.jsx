import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const ExaminationForm = ({ show, onHide, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: '',
        date: new Date().toISOString().split('T')[0],
        results: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nový záznam vyšetření</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Typ vyšetření</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Např. Ultrazvuk, EKG, Laboratorní vyšetření"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Datum vyšetření</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Výsledky</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="results"
                            value={formData.results}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Zadejte výsledky vyšetření"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Poznámky</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Doplňující informace nebo doporučení"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button
                            variant="secondary"
                            onClick={onHide}
                            className="me-2"
                        >
                            Zrušit
                        </Button>
                        <Button variant="primary" type="submit">
                            Uložit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExaminationForm;
