// pages/PatientDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { patients as allPatients } from '../data/patients';

// Komponenta pro zobrazení přehledu o pacientovi
const PatientDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Najdeme pacienta podle ID
    const patient = allPatients.find((p) => String(p.id) === id);

    if (!patient) {
        return <div className="p-4">Pacient nenalezen.</div>;
    }

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-4">
                <Col md={8}>
                    <h2>{patient.name}</h2>
                    <p className="text-muted">
                        {patient.gender === 'female' ? 'Žena' : 'Muž'} &bull; Věk {patient.age}
                    </p>
                    <div className="d-flex gap-3">
                        <Button
                            variant="outline-primary"
                            onClick={() => (window.location.href = `tel:${patient.phone}`)}
                        >
                            Zavolat
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={() => (window.location.href = `mailto:${patient.email}`)}
                        >
                            Poslat Email
                        </Button>
                    </div>
                </Col>
                <Col md={4} className="text-end">
                    <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => navigate(`/patient/${patient.id}/edit`)}
                    >
                        Upravit
                    </Button>
                    <Button variant="danger">Smazat</Button>
                </Col>
            </Row>

            {/* Přehledové karty */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="mb-3">
                        <Card.Header>Vitals</Card.Header>
                        <Card.Body className="d-flex gap-5 flex-wrap">
                            <div><strong>120 mg/dt</strong><br />Hladina cukru</div>
                            <div><strong>{patient.weight} kg</strong><br />Váha</div>
                            <div><strong>70 bpm</strong><br />Tepová frekvence</div>
                            <div><strong>71%</strong><br />Saturace kyslíkem</div>
                            <div><strong>36.8 &deg;C</strong><br />Teplota</div>
                            <div><strong>120/80</strong><br />Tlak</div>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Header>Léky</Card.Header>
                        <Card.Body>
                            <p><strong>Ursofalk 300</strong> – 2 tablety, 14:00, Běžná léčba</p>
                            <p><strong>Indever 20</strong> – 1 tableta, 14:20, Akutní stav</p>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Výsledky vyšetření</Card.Header>
                        <Card.Body>
                            <p><strong>UV Invasive Ultrasound</strong> – 14:00</p>
                            <p className="text-muted">
                                Vyšetření ukázalo změny v levé části krku. Doporučeno neurologické vyšetření.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PatientDetailPage;