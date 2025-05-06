import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsPlus, BsQrCode } from 'react-icons/bs';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../config/permissions';
import PermissionGuard from '../common/PermissionGuard';

const formatDate = (dateString) => {
    if (!dateString) return 'Neuvedeno';
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const PrescriptionItem = ({ prescription, onShowQr }) => {
    let medications = [];
    try {
        medications = Array.isArray(prescription.medications)
            ? prescription.medications
            : JSON.parse(prescription.medications || '[]');
    } catch {
        medications = [];
    }
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center border-bottom">
                <div>
                    <strong className="fw-bold text-dark">
                        E-Recept ze dne {formatDate(prescription.created_at)}
                    </strong>
                </div>
                {prescription.qr_code && (
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-1 text-primary"
                        onClick={() => onShowQr && onShowQr(prescription)}
                    >
                        <BsQrCode className="text-primary" size={18} /> QR kód
                    </Button>
                )}
            </Card.Header>
            <Card.Body>
                <div className="mb-2">
                    <strong>Platnost do:</strong>{' '}
                    {formatDate(prescription.expiration_date)}
                </div>
                <div className="mb-2">
                    <strong>Léky:</strong>
                    <ul className="mb-0">
                        {medications.length > 0 ? (
                            medications.map((med, idx) => (
                                <li key={idx}>
                                    <div>
                                        <strong>{med.name}</strong>
                                    </div>
                                    <div className="text-muted small">
                                        {med.dosage && (
                                            <span>
                                                Dávkování: {med.dosage}{' '}
                                            </span>
                                        )}
                                        {med.duration && (
                                            <span>| Délka: {med.duration}</span>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>Neuvedeno</li>
                        )}
                    </ul>
                </div>
                {prescription.notes && (
                    <div className="mb-2">
                        <strong>Poznámka:</strong> {prescription.notes}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

const PrescriptionList = ({ prescriptions = [], onAdd, onShowQr }) => {
    // Sort prescriptions by created_at (newest first)
    const sortedPrescriptions = [...prescriptions].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <h5 className="mb-0 fw-bold text-primary">Přehled e-receptů</h5>
                <PermissionGuard permission={PERMISSIONS.PRESCRIPTION_CREATE}>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2"
                        onClick={onAdd}
                        style={{ cursor: 'pointer', zIndex: 1 }}
                    >
                        <BsPlus className="text-white" />
                        <span className="d-none d-sm-inline">
                            Přidat e-recept
                        </span>
                        <span className="d-sm-none">Přidat</span>
                    </Button>
                </PermissionGuard>
            </div>
            <div>
                {sortedPrescriptions.length > 0 ? (
                    sortedPrescriptions.map((prescription) => (
                        <PrescriptionItem
                            key={prescription.id}
                            prescription={prescription}
                            onShowQr={onShowQr}
                        />
                    ))
                ) : (
                    <p className="text-muted small mb-0">
                        Žádné e-recepty nejsou k dispozici.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PrescriptionList;
