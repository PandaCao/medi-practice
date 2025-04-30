import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil, BsPlus } from 'react-icons/bs';

const DiagnosisItem = ({ diagnosis, onEdit }) => (
    <div className="mb-3">
        <div className="d-flex justify-content-between align-items-start gap-3">
            <div className="flex-grow-1">
                <div className="fw-bold mb-1">{diagnosis.code}</div>
                <p className="text-muted small mb-0">{diagnosis.description}</p>
            </div>
            <Button
                variant="link"
                size="sm"
                className="d-inline-flex align-items-center flex-shrink-0 text-muted p-0"
                onClick={() => onEdit(diagnosis)}
            >
                <BsPencil />
            </Button>
        </div>
    </div>
);

const DiagnosisList = ({ diagnoses = [], onAdd, onEdit }) => {
    // Ensure diagnoses is an array
    const diagnosesArray = Array.isArray(diagnoses) ? diagnoses : [];

    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0">Přehled diagnóz</h5>
                <Button
                    variant="primary"
                    size="sm"
                    className="d-inline-flex align-items-center gap-2"
                    onClick={onAdd}
                >
                    <BsPlus />
                    <span className="d-none d-sm-inline">Přidat diagnózu</span>
                    <span className="d-sm-none">Přidat</span>
                </Button>
            </div>
            <div>
                {diagnosesArray.length > 0 ? (
                    diagnosesArray.map((diagnosis) => (
                        <DiagnosisItem
                            key={diagnosis.id}
                            diagnosis={diagnosis}
                            onEdit={onEdit}
                        />
                    ))
                ) : (
                    <p className="text-muted small mb-0">
                        Žádné diagnózy nejsou k dispozici.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DiagnosisList;
