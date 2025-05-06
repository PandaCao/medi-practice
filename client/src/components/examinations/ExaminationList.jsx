import React, { useState, useMemo } from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsPencil, BsPlus, BsFileMedical, BsChevronDown } from 'react-icons/bs';

const ITEMS_PER_PAGE = 3;

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
            <Card.Body>
                {diagnoses.length > 0 && (
                    <div className="mb-3">
                        <h6 className="text-primary mb-2">Diagnózy</h6>
                        {diagnoses.map((diagnosis, index) => (
                            <div
                                key={index}
                                className="mb-2 ps-3 border-start border-primary"
                            >
                                <div className="fw-bold">{diagnosis.code}</div>
                                <div className="text-muted small">
                                    {diagnosis.description}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">Anamnéza</h6>
                            <p className="mb-0 text-muted">
                                {examination.anamnesis || 'Neuvedeno'}
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">
                                Objektivní nález
                            </h6>
                            <p className="mb-0 text-muted">
                                {examination.objective_findings || 'Neuvedeno'}
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">
                                Laboratorní výsledky
                            </h6>
                            <p className="mb-0 text-muted">
                                {examination.lab_results || 'Neuvedeno'}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">Medikace</h6>
                            <p className="mb-0 text-muted">
                                {examination.medication || 'Neuvedeno'}
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">
                                Předepsaná medikace
                            </h6>
                            <p className="mb-0 text-muted">
                                {examination.prescribed_medication ||
                                    'Neuvedeno'}
                            </p>
                        </div>
                        <div className="mb-3">
                            <h6 className="text-primary mb-2">Doporučení</h6>
                            <p className="mb-0 text-muted">
                                {examination.recommendations || 'Neuvedeno'}
                            </p>
                        </div>
                        {examination.conclusions && (
                            <div className="mb-3">
                                <h6 className="text-primary mb-2">Závěry</h6>
                                <p className="mb-0 text-muted">
                                    {examination.conclusions}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

const ExaminationList = ({ examinations = [], onAdd, onEdit }) => {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Sort examinations by date (newest first) and memoize the result
    const sortedExaminations = useMemo(() => {
        return [...examinations].sort((a, b) => {
            return new Date(b.examination_date) - new Date(a.examination_date);
        });
    }, [examinations]);

    const visibleExaminations = sortedExaminations.slice(0, visibleCount);
    const hasMore = visibleCount < sortedExaminations.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0 fw-bold text-primary">Přehled vyšetření</h5>
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="d-inline-flex align-items-center gap-2"
                    onClick={onAdd}
                    style={{ cursor: 'pointer', zIndex: 1 }}
                >
                    <BsPlus className="text-white" />
                    <span className="d-none d-sm-inline">Přidat vyšetření</span>
                    <span className="d-sm-none">Přidat</span>
                </Button>
            </div>
            <div>
                {visibleExaminations.length > 0 ? (
                    <>
                        {visibleExaminations.map((examination) => (
                            <ExaminationItem
                                key={examination.id}
                                examination={examination}
                                onEdit={onEdit}
                            />
                        ))}
                        {hasMore && (
                            <div className="text-center mt-3">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="d-inline-flex align-items-center gap-2"
                                    onClick={handleLoadMore}
                                >
                                    <BsChevronDown />
                                    Načíst další vyšetření
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-muted small mb-0">
                        Žádná vyšetření nejsou k dispozici.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExaminationList;
