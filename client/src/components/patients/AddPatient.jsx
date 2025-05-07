import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    validateForm,
    parsePersonalId,
} from '../../tools/AddPatientValidation';
import { INSURANCE_COMPANIES_LIST } from '../../config/constants';
import PersonalIdInput from './PersonalIdInput';

const AddPatient = ({ onSaveDraft, onSubmit, onDelete, initialData = {} }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        personalId: initialData.personalId || '',
        birthDate: '', // Ukládáme interně, ale nezobrazujeme
        gender: '', // Ukládáme interně, ale nezobrazujeme
        insuranceCompany: initialData.insuranceCompany || '',
        registrationDate:
            initialData.registrationDate ||
            new Date().toISOString().split('T')[0],
        height: initialData.height || '',
        weight: initialData.weight || '',
        contactPersonName: initialData.contactPersonName || '',
        contactPersonPhone: initialData.contactPersonPhone || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        addressStreet: initialData.addressStreet || '',
        addressCity: initialData.addressCity || '',
        addressZip: initialData.addressZip || '',
    });

    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    useEffect(() => {
        if (initialData.personalId) {
            const parsed = parsePersonalId(initialData.personalId);
            if (parsed) {
                setFormData((prev) => ({
                    ...prev,
                    birthDate: parsed.birthDate,
                    gender: parsed.gender,
                }));
            }
        }
    }, [initialData.personalId]);

    const handleChange = (e) => {
        let name, value;

        // Podpora pro oba typy vstupů - event objekt i přímá hodnota
        if (e && e.target) {
            // Klasický input event
            name = e.target.name;
            value = e.target.value;
        } else {
            // Přímá hodnota (např. z PersonalIdInput)
            name = 'personalId';
            value = e;
        }

        // Speciální logika pro rodné číslo
        if (name === 'personalId') {
            const parsedData = parsePersonalId(value);
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                ...(parsedData
                    ? {
                          birthDate: parsedData.birthDate,
                          gender: parsedData.gender,
                      }
                    : {}),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validateField = (name, value) => {
        const fieldErrors = validateForm({
            ...formData,
            [name]: value,
        });

        // Vrátíme pouze chybu pro konkrétní pole
        return fieldErrors[name];
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Označíme pole jako "touched"
        setTouchedFields((prev) => ({
            ...prev,
            [name]: true,
        }));

        // Validujeme pouze toto pole
        const fieldError = validateField(name, value);
        if (fieldError) {
            setErrors((prev) => ({
                ...prev,
                [name]: fieldError,
            }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        console.log('Submitting form', formData, validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Calling onSubmit');
            onSubmit(formData);
        } else {
            // Při odeslání označíme všechna pole jako touched
            const allFieldsTouched = Object.keys(formData).reduce(
                (acc, field) => ({
                    ...acc,
                    [field]: true,
                }),
                {},
            );
            setTouchedFields(allFieldsTouched);
            setErrors(validationErrors);
        }
    };

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    // Helper pro zobrazení chyby pouze pokud bylo pole "touched"
    const shouldShowError = (fieldName) =>
        touchedFields[fieldName] && errors[fieldName];

    return (
        <Form onSubmit={handleSubmit}>
            {/* Osobní údaje */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Jméno</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('firstName')}
                            placeholder="Zadejte jméno"
                            maxLength={50}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Příjmení</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('lastName')}
                            placeholder="Zadejte příjmení"
                            maxLength={50}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Rodné číslo a pojišťovna */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Rodné číslo</RequiredLabel>
                        <PersonalIdInput
                            value={formData.personalId}
                            onChange={(value) => handleChange(value)}
                            name="personalId"
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('personalId')}
                            error={errors.personalId}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Zdravotní pojišťovna</RequiredLabel>
                        <Form.Select
                            name="insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('insuranceCompany')}
                        >
                            <option value="">Vyberte pojišťovnu</option>
                            {INSURANCE_COMPANIES_LIST.map((company) => (
                                <option key={company.code} value={company.code}>
                                    {company.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.insuranceCompany}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Datum registrace, výška, váha */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Datum registrace</RequiredLabel>
                        <Form.Control
                            type="date"
                            name="registrationDate"
                            value={formData.registrationDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('registrationDate')}
                            max={new Date().toISOString().split('T')[0]}
                            placeholder="Vyberte datum"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.registrationDate}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Výška (cm)</Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('height')}
                            min={1}
                            max={999}
                            placeholder="Např. 180"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.height}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Váha (kg)</Form.Label>
                        <Form.Control
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('weight')}
                            min={1}
                            max={999}
                            placeholder="Např. 75"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.weight}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Kontakt, e-mail, telefon */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('email')}
                            maxLength={100}
                            placeholder="např. pacient@email.cz"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Telefon</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('phone')}
                            maxLength={13}
                            placeholder="123456789"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone +
                                '. Zadejte číslo bez předvolby +420, například 777123456.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Adresa */}
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Ulice a číslo</Form.Label>
                        <Form.Control
                            type="text"
                            name="addressStreet"
                            value={formData.addressStreet}
                            onChange={handleChange}
                            placeholder="Např. Hlavní 123"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Město</Form.Label>
                        <Form.Control
                            type="text"
                            name="addressCity"
                            value={formData.addressCity}
                            onChange={handleChange}
                            placeholder="Např. Praha"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>PSČ</Form.Label>
                        <Form.Control
                            type="text"
                            name="addressZip"
                            value={formData.addressZip}
                            onChange={handleChange}
                            placeholder="Např. 11000"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Kontaktní osoba - jméno a telefon */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Jméno kontaktní osoby</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactPersonName"
                            value={formData.contactPersonName}
                            onChange={handleChange}
                            placeholder="Jméno kontaktní osoby"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Telefon kontaktní osoby</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactPersonPhone"
                            value={formData.contactPersonPhone}
                            onChange={handleChange}
                            placeholder="Telefon kontaktní osoby"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Akční tlačítka */}
            <div className="d-flex justify-content-end gap-2 mt-4">
                {onDelete && (
                    <Button variant="outline-danger" onClick={onDelete}>
                        Smazat
                    </Button>
                )}
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Zrušit
                </Button>
                <Button variant="primary" type="submit">
                    Uložit
                </Button>
            </div>
        </Form>
    );
};

export default AddPatient;
