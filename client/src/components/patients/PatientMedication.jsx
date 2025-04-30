import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';

const PatientMedication = ({ medication, onEdit }) => {
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0">Léky</h5>
                <Button
                    variant="link"
                    size="sm"
                    className="d-inline-flex align-items-center text-muted p-0"
                    onClick={onEdit}
                >
                    <BsPencil />
                </Button>
            </div>
            <div>
                <p className="text-muted small mb-0">
                    {medication || 'Žádné léky nejsou k dispozici.'}
                </p>
            </div>
        </div>
    );
};

export default PatientMedication;
