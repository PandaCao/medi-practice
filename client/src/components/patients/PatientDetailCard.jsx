import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';
import { RiFileList2Line } from 'react-icons/ri';
import { getInsuranceCompanyName } from '../../config/constants';

const EmptyFieldMessage = () => (
    <div className="text-muted small">Není vyplněno</div>
);

const ContactField = ({ label, value }) => (
    <div className="mb-1">
        <div className="text-muted small">{label}:</div>
        {value ? <div>{value}</div> : <EmptyFieldMessage />}
    </div>
);

const PatientDetailCard = ({ patient, onUpdate, onERecept }) => {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                    <div className="text-muted">Pacient:</div>
                    <h4 className="mb-0">{patient.name}</h4>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2"
                        onClick={onUpdate}
                    >
                        <BsPencil />
                        <span className="d-none d-sm-inline">Upravit</span>
                    </Button>
                    <Button
                        variant="light"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2 border"
                        onClick={onERecept}
                    >
                        <RiFileList2Line />
                        <span className="d-none d-sm-inline">E-Recept</span>
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Základní info:</div>
                        <div className="mb-1">
                            <div className="text-muted small">
                                Datum narození:
                            </div>
                            <div>{patient.dateOfBirth}</div>
                        </div>
                        <div className="mb-1">
                            <div className="text-muted small">Rodné číslo:</div>
                            <div>{patient.personalId}</div>
                        </div>
                        <div className="mb-1">
                            <div className="text-muted small">
                                Datum registrace:
                            </div>
                            <div>{patient.registrationDate}</div>
                        </div>
                        <div>
                            <div className="text-muted small">
                                Zdravotní pojišťovna:
                            </div>
                            <div>
                                {getInsuranceCompanyName(patient.insurance)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Kontaktní údaje:</div>
                        <ContactField label="Email" value={patient.email} />
                        <ContactField label="Telefon" value={patient.phone} />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Kontaktní osoba:</div>
                        <ContactField
                            label="Jméno"
                            value={patient.contactPerson}
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div>
                <div className="text-muted mb-2">Poslední návštěva:</div>
                <div className="d-flex gap-5">
                    <div>
                        <div className="text-muted small">Datum:</div>
                        <div>2/3/2025</div>
                    </div>
                    <div>
                        <div className="text-muted small">Výška:</div>
                        <div>{patient.height} cm</div>
                    </div>
                    <div>
                        <div className="text-muted small">Váha:</div>
                        <div>{patient.weight} kg</div>
                    </div>
                    <div>
                        <div className="text-muted small">Krevní tlak:</div>
                        <div>140/90 mmHg</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailCard;
