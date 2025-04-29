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

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nový záznam vyšetření</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <RequiredLabel>Typ vyšetření</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Např. Ultrazvuk, EKG, Laboratorní vyšetření"
                            required
                            maxLength={50}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Datum vyšetření</RequiredLabel>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Výsledky</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            name="results"
                            value={formData.results}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Zadejte výsledky vyšetření"
                            required
                            maxLength={500}
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
                            maxLength={500}
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
