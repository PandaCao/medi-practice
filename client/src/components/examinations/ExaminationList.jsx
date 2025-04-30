import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil, BsPlus } from 'react-icons/bs';

const ExaminationItem = ({ examination, onEdit }) => (
    <div className="mb-3">
        <div className="d-flex justify-content-between align-items-start gap-3">
            <div className="flex-grow-1">
                <div className="fw-bold mb-1">
                    {examination.diagnosis_overview}
                </div>
                <p className="text-muted small mb-0">
                    <strong>Anamnéza:</strong> {examination.anamnesis}
                </p>
                <p className="text-muted small mb-0">
                    <strong>Medikace:</strong> {examination.medication}
                </p>
                <p className="text-muted small mb-0">
                    <strong>Laboratorní výsledky:</strong>{' '}
                    {examination.lab_results}
                </p>
                <p className="text-muted small mb-0">
                    <strong>Objektivní nález:</strong>{' '}
                    {examination.objective_findings}
                </p>
                {examination.conclusions && (
                    <p className="text-muted small mb-0 mt-1">
                        <strong>Závěry:</strong> {examination.conclusions}
                    </p>
                )}
                <p className="text-muted small mb-0">
                    <strong>Doporučení:</strong> {examination.recommendations}
                </p>
                <p className="text-muted small mb-0">
                    <strong>Předepsaná medikace:</strong>{' '}
                    {examination.prescribed_medication}
                </p>
            </div>
            <Button
                variant="link"
                size="sm"
                className="d-inline-flex align-items-center flex-shrink-0 text-muted p-0"
                onClick={() => onEdit(examination)}
            >
                <BsPencil />
            </Button>
        </div>
    </div>
);

const ExaminationList = ({ examinations = [], onAdd, onEdit }) => {
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0">Přehled vyšetření</h5>
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="d-inline-flex align-items-center gap-2"
                    onClick={onAdd}
                    style={{ cursor: 'pointer', zIndex: 1 }}
                >
                    <BsPlus />
                    <span className="d-none d-sm-inline">Přidat vyšetření</span>
                    <span className="d-sm-none">Přidat</span>
                </Button>
            </div>
            <div>
                {examinations.length > 0 ? (
                    examinations.map((examination) => (
                        <ExaminationItem
                            key={examination.id}
                            examination={examination}
                            onEdit={onEdit}
                        />
                    ))
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
