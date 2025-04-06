//componenta pro vytvoření a úpravu karty pacienta
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

const AddPatient = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        personalId: '',
        gender: '',
        birthDate: '',
        insuranceCompany: '',
        registrationDate: new Date().toISOString().split('T')[0],
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

    // Přidáme funkci pro formátování data
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('cs-CZ').split('.').reverse().join('-');
    };

    // Upravíme handleChange pro práci s daty
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    // V komponentě přidáme seznam pojišťoven
    const insuranceCompanies = [
        { code: '111', name: 'Všeobecná zdravotní pojišťovna' },
        { code: '201', name: 'Vojenská zdravotní pojišťovna' },
        { code: '205', name: 'Česká průmyslová zdravotní pojišťovna' },
        { code: '207', name: 'Oborová zdravotní pojišťovna' },
        { code: '209', name: 'Zaměstnanecká pojišťovna Škoda' },
        { code: '211', name: 'Zdravotní pojišťovna ministerstva vnitra' },
        { code: '213', name: 'RBP, zdravotní pojišťovna' },
    ];

    const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    return (
        <>
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
                                isInvalid={!!errors.firstName}
                                placeholder="Zadejte jméno"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Použijte pouze písmena, max. 50 znaků
                            </Form.Text>
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
                                isInvalid={!!errors.lastName}
                                placeholder="Zadejte příjmení"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Použijte pouze písmena, max. 50 znaků
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Identifikační údaje */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <RequiredLabel>Rodné číslo</RequiredLabel>
                            <OverlayTrigger
                                placement="right"
                                overlay={renderTooltip(
                                    'Zadejte rodné číslo ve formátu XXXXXX/XXX nebo XXXXXX/XXXX. Číslo musí odpovídat pohlaví a datu narození.',
                                )}
                            >
                                <BsInfoCircle className="ms-2" />
                            </OverlayTrigger>
                            <Form.Control
                                type="text"
                                name="personalId"
                                value={formData.personalId}
                                onChange={handleChange}
                                isInvalid={!!errors.personalId}
                                placeholder="Zadejte rodné číslo (např. 920102/232)"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.personalId}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Příklad: 920102/232 nebo 920102/2321
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <RequiredLabel>Datum narození</RequiredLabel>
                            <OverlayTrigger
                                placement="right"
                                overlay={renderTooltip(
                                    'Datum narození musí odpovídat rodnému číslu',
                                )}
                            >
                                <BsInfoCircle className="ms-2" />
                            </OverlayTrigger>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                isInvalid={!!errors.birthDate}
                                lang="cs-CZ"
                                style={{
                                    WebkitLocaleDateFormat: 'dd/MM/yyyy',
                                    MozLocaleDateFormat: 'dd/MM/yyyy',
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.birthDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Základní údaje */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <RequiredLabel>Pohlaví</RequiredLabel>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                isInvalid={!!errors.gender}
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
                            <OverlayTrigger
                                placement="right"
                                overlay={renderTooltip(
                                    'Kód pojišťovny najdete na kartičce pojištěnce',
                                )}
                            >
                                <BsInfoCircle className="ms-2" />
                            </OverlayTrigger>
                            <Form.Select
                                name="insuranceCompany"
                                value={formData.insuranceCompany}
                                onChange={handleChange}
                                isInvalid={!!errors.insuranceCompany}
                            >
                                <option value="">Vyberte pojišťovnu</option>
                                {insuranceCompanies.map((company) => (
                                    <option
                                        key={company.code}
                                        value={company.code}
                                    >
                                        {company.code} - {company.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.insuranceCompany}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Datum registrace a výška */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <RequiredLabel>Datum registrace</RequiredLabel>
                            <Form.Control
                                type="date"
                                name="registrationDate"
                                value={formData.registrationDate}
                                onChange={handleChange}
                                isInvalid={!!errors.registrationDate}
                                max={new Date().toISOString().split('T')[0]}
                                lang="cs-CZ"
                                style={{
                                    WebkitLocaleDateFormat: 'dd/MM/yyyy',
                                    MozLocaleDateFormat: 'dd/MM/yyyy',
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.registrationDate}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Datum nesmí být v budoucnosti
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Výška</Form.Label>
                            <Form.Control
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                isInvalid={!!errors.height}
                                placeholder="Zadejte výšku v cm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.height}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Zadejte hodnotu v centimetrech (2-3 číslice)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Váha a Email */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Váha</Form.Label>
                            <Form.Control
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                isInvalid={!!errors.weight}
                                placeholder="Zadejte váhu v kg"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.weight}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Zadejte hodnotu v kilogramech (2-3 číslice)
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                placeholder="jmeno@domena.cz"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Telefon a Kontaktní osoba */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                placeholder="Zadejte telefonní číslo (9-12 číslic)"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Formát: 777123456 nebo 420777123456
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Kontaktní osoba</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                isInvalid={!!errors.contactPerson}
                                placeholder="Jméno a příjmení kontaktní osoby"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.contactPerson}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Max. 100 znaků
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Přehled diagnóz - přes celý řádek */}
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Přehled diagnóz</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="diagnosisOverview"
                                value={formData.diagnosisOverview}
                                onChange={handleChange}
                                isInvalid={!!errors.diagnosisOverview}
                                placeholder="Zadejte přehled diagnóz pacienta"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.diagnosisOverview}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Max. 500 znaků
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Tlačítka */}
                <div className="d-flex justify-content-end gap-2 mt-4">
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
        </>
    );
};

export default AddPatient;
