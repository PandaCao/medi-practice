import React from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { BsFileMedical, BsPencil } from 'react-icons/bs';
import SignaturePreview from '../common/SignaturePreview';
import StampPreview from '../common/StampPreview';

const ExaminationItem = ({ examination, onEdit }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('cs-CZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const parseDiagnoses = (diagnosisOverview) => {
        try {
            const diagnoses = JSON.parse(diagnosisOverview);
            return Array.isArray(diagnoses) ? diagnoses : [];
        } catch (e) {
            return [];
        }
    };

    const diagnoses = parseDiagnoses(examination.diagnosis_overview);

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center border-bottom">
                <div className="d-flex align-items-center gap-2">
                    <BsFileMedical className="text-primary" size={20} />
                    <h6 className="mb-0 fw-bold text-dark">
                        Vyšetření ze dne{' '}
                        {formatDate(examination.examination_date)}
                    </h6>
                </div>
                <Button
                    variant="link"
                    size="sm"
                    className="d-inline-flex align-items-center text-primary p-0"
                    onClick={() => onEdit(examination)}
                >
                    <BsPencil size={18} />
                </Button>
            </Card.Header>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Detail vyšetření</Accordion.Header>
                    <Accordion.Body>
                        {diagnoses.length > 0 ? (
                            <>
                                <h6 className="text-primary">Diagnózy</h6>
                                <ul className="list-unstyled ps-3 border-start border-primary">
                                    {diagnoses.map((diagnosis, index) => (
                                        <li key={index} className="mb-2">
                                            <strong>{diagnosis.code}</strong>:{' '}
                                            {diagnosis.description}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="text-muted">Žádné diagnózy</p>
                        )}

                        <h6 className="text-primary mt-3">Anamnéza</h6>
                        <p className="text-muted">
                            {examination.anamnesis || 'Neuvedeno'}
                        </p>

                        <h6 className="text-primary mt-3">Objektivní nález</h6>
                        <p className="text-muted">
                            {examination.objective_findings || 'Neuvedeno'}
                        </p>

                        <h6 className="text-primary mt-3">
                            Laboratorní výsledky
                        </h6>
                        <p className="text-muted">
                            {examination.lab_results || 'Neuvedeno'}
                        </p>

                        <h6 className="text-primary mt-3">Medikace</h6>
                        <p className="text-muted">
                            {examination.medication || 'Neuvedeno'}
                        </p>

                        <h6 className="text-primary mt-3">
                            Předepsaná medikace
                        </h6>
                        <p className="text-muted">
                            {examination.prescribed_medication || 'Neuvedeno'}
                        </p>

                        <h6 className="text-primary mt-3">Doporučení</h6>
                        <p className="text-muted">
                            {examination.recommendations || 'Neuvedeno'}
                        </p>

                        {examination.conclusions && (
                            <>
                                <h6 className="text-primary mt-3">Závěry</h6>
                                <p className="text-muted">
                                    {examination.conclusions}
                                </p>
                            </>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="text-muted small mb-1">Lékař</div>
                        <div className="fw-bold">MUDr. Jan Suk</div>
                    </div>
                    <div className="d-flex gap-3">
                        {examination.stamp && (
                            <div>
                                <div className="text-muted small mb-1">
                                    Razítko
                                </div>
                                <StampPreview
                                    text={examination.stamp}
                                    compact
                                />
                            </div>
                        )}
                        {examination.doctors_signature && (
                            <div>
                                <div className="text-muted small mb-1">
                                    Podpis
                                </div>
                                <SignaturePreview
                                    text={examination.doctors_signature}
                                    compact
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ExaminationItem;
