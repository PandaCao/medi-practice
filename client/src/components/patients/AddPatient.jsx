import React from 'react';
import { useState } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { validateForm } from '../../tools/AddPatientValidation';
import { INSURANCE_COMPANIES_LIST } from '../../config/constants';
import PersonalIdInput from './PersonalIdInput';

const AddPatient = ({ onSaveDraft, onSubmit, onDelete, initialData = {} }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        personalId: initialData.personalId || '',
        birthDate: initialData.birthDate || '',
        gender: initialData.gender || '',
        insuranceCompany: initialData.insuranceCompany || '',
        registrationDate:
            initialData.registrationDate ||
            new Date().toISOString().split('T')[0],
        height: initialData.height || '',
        weight: initialData.weight || '',
        contactPerson: initialData.contactPerson || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        diagnosisOverview: initialData.diagnosisOverview || '',
        anamnesis: initialData.anamnesis || '',
        medication: initialData.medication || '',
    });

    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
        if (Object.keys(validationErrors).length === 0) {
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

    const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

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

            {/* Rodné číslo a datum narození */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Rodné číslo</RequiredLabel>
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip(
                                'Zadejte rodné číslo ve formátu XXXXXX/XXX nebo XXXXXX/XXXX.',
                            )}
                        >
                            <BsInfoCircle className="ms-2" />
                        </OverlayTrigger>
                        <PersonalIdInput
                            value={formData.personalId}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    personalId: value,
                                }));
                                // Validujeme při změně, protože PersonalIdInput nemá vlastní onBlur
                                const fieldError = validateField(
                                    'personalId',
                                    value,
                                );
                                if (touchedFields.personalId) {
                                    if (fieldError) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            personalId: fieldError,
                                        }));
                                    } else {
                                        setErrors((prev) => {
                                            const newErrors = { ...prev };
                                            delete newErrors.personalId;
                                            return newErrors;
                                        });
                                    }
                                }
                            }}
                            onFocus={() => {
                                setTouchedFields((prev) => ({
                                    ...prev,
                                    personalId: true,
                                }));
                            }}
                            isInvalid={shouldShowError('personalId')}
                            error={errors.personalId}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Datum narození</RequiredLabel>
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip(
                                'Datum narození musí odpovídat rodnému číslu.',
                            )}
                        >
                            <BsInfoCircle className="ms-2" />
                        </OverlayTrigger>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('birthDate')}
                            max={new Date().toISOString().split("T")[0]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.birthDate}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Pojišťovna a pohlaví */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <RequiredLabel>Pohlaví</RequiredLabel>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={shouldShowError('gender')}
                        >
                            <option value="">Vyberte pohlaví</option>
                            <option value="male">Muž</option>
                            <option value="female">Žena</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
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
                            {errors.phone + '. Zadejte číslo bez předvolby +420, například 777123456.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            {/* Kontaktní osoba */}
            <Form.Group className="mb-3">
                <Form.Label>Kontaktní osoba</Form.Label>
                <Form.Control
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={shouldShowError('contactPerson')}
                    maxLength={100}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.contactPerson}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Diagnózy */}
            <Form.Group className="mb-3">
                <Form.Label>Přehled diagnóz</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="diagnosisOverview"
                    value={formData.diagnosisOverview}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={shouldShowError('diagnosisOverview')}
                    maxLength={500}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.diagnosisOverview}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Anamnéza</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="anamnesis"
                    value={formData.anamnesis}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={shouldShowError('anamnesis')}
                    maxLength={500}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.anamnesis}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Seznam léků</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={shouldShowError('medication')}
                    maxLength={500}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.medication}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Akční tlačítka */}
            <div className="d-flex justify-content-end gap-2 mt-4">
                {onDelete && (
                    <Button variant="outline-danger" onClick={onDelete}>
                        Smazat
                    </Button>
                )}
                {onSaveDraft && (
                    <Button
                        variant="warning"
                        onClick={() => onSaveDraft(formData)}
                    >
                        Uložit jako koncept
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
