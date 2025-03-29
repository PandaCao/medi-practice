//componenta pro vytvoření a úpravu karty pacienta
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { validateForm } from '../../tools/AddPatientValidation';

const AddPatient = ({ onSaveDraft, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        personalId: '',
        gender: '',
        insuranceCompany: '',
        registrationDate: '',
        height: '',
        weight: '',
        contactPerson: '',
        email: '',
        phone: '',
        diagnosisOverview: '',
        anamnesis: '',
        medication: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Jméno</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Příjmení</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>RČ</Form.Label>
                            <Form.Control
                                type="text"
                                name="personalId"
                                value={formData.personalId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pohlaví</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Vyberte pohlaví</option>
                                <option value="male">Muž</option>
                                <option value="female">Žena</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Zdravotní pojišťovna</Form.Label>
                            <Form.Control
                                type="text"
                                name="insuranceCompany"
                                value={formData.insuranceCompany}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Datum registrace</Form.Label>
                            <Form.Control
                                type="date"
                                name="registrationDate"
                                value={formData.registrationDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Výška (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Váha (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Kontaktní osoba</Form.Label>
                    <Form.Control
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Přehled diagnóz</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="diagnosisOverview"
                        value={formData.diagnosisOverview}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button variant="outline-danger" onClick={onDelete}>
                        Smazat
                    </Button>
                    <Button variant="primary" type="submit">
                        Uložit
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default AddPatient;
