import React from 'react';
import { Button } from 'react-bootstrap';
import {
    BsPencil,
} from 'react-icons/bs';
import { getInsuranceCompanyName } from '../../config/constants';

const EmptyFieldMessage = () => (
    <span className="text-muted small">Není vyplněno</span>
);

const ContactField = ({ label, value }) => (
    <div className="mb-1">
        <span className="text-muted small">{label}:</span>{' '}
        {value ? <span>{value}</span> : <EmptyFieldMessage />}
    </div>
);

const PatientDetailCard = ({
    patient,
    onUpdate,
    onDelete,
    onERecept,
    showEReceptButton = true,
}) => {
    // Věk z data narození
    const getAge = (dateString) => {
        if (!dateString) return null;
        const [day, month, year] = dateString.split('.').map((s) => s.trim());
        const birthDate = new Date(`${year}-${month}-${day}`);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    const age = getAge(patient.dateOfBirth);

    return (
        <div className="border-0" style={{ margin: '-16px' }}>
            <div className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top p-3">
                <div className="d-flex align-items-center gap-3">
                    {/* <BsPersonCircle size={40} className="text-white" /> */}
                    <div>
                        <div className="fw-bold h4 mb-0">{patient.name}</div>
                        {age !== null && <span>{age} let</span>}
                        {patient.sex && (
                            <span className="ms-2">
                                {patient.sex === 'male' ? 'Muž' : 'Žena'}
                            </span>
                        )}
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        variant="light"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2 fw-bold"
                        onClick={onUpdate}
                    >
                        <BsPencil className="text-primary" />
                        <span className="d-none d-sm-inline text-primary">
                            Upravit
                        </span>
                    </Button>
                </div>
            </div>
            <div className="bg-white p-3">
                <div className="row">
                    <div className="col-md-6 col-lg-4 ">
                        <div className="fw-bold text-primary mb-2">
                            Základní informace
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">
                                Datum narození:
                            </span>{' '}
                            <span>{patient.dateOfBirth}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">
                                Rodné číslo:
                            </span>{' '}
                            <span>{patient.personalId}</span>
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">
                                Pojišťovna:
                            </span>{' '}
                            <span>
                                {getInsuranceCompanyName(patient.insurance)}
                            </span>
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">Výška:</span>{' '}
                            {patient.height ? (
                                `${patient.height} cm`
                            ) : (
                                <EmptyFieldMessage />
                            )}
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">Váha:</span>{' '}
                            {patient.weight ? (
                                `${patient.weight} kg`
                            ) : (
                                <EmptyFieldMessage />
                            )}
                        </div>
                        <div className="mb-1">
                            <span className="text-muted small">
                                Datum registrace:
                            </span>{' '}
                            <span>
                                {patient.registrationDate ? (
                                    new Date(
                                        patient.registrationDate,
                                    ).toLocaleDateString('cs-CZ')
                                ) : (
                                    <EmptyFieldMessage />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 ">
                        <div className="fw-bold text-primary mb-2">
                            Kontaktní údaje
                        </div>
                        <ContactField
                            label="Email"
                            value={
                                patient.contact_info?.contact_email ||
                                patient.email ||
                                ''
                            }
                        />
                        <ContactField
                            label="Telefon"
                            value={
                                patient.contact_info?.contact_phone ||
                                patient.phone ||
                                ''
                            }
                        />
                    </div>
                    <div className="col-md-6 col-lg-4 ">
                        <div className="fw-bold text-primary mb-2">
                            Kontaktní osoba
                        </div>
                        <ContactField
                            label="Jméno"
                            value={
                                patient.contact_info?.contact_person?.name ||
                                patient.contact_info?.contact_person_name ||
                                ''
                            }
                        />
                        <ContactField
                            label="Telefon"
                            value={
                                patient.contact_info?.contact_person?.phone ||
                                patient.contact_info?.contact_person_phone ||
                                ''
                            }
                        />
                        <div className="fw-bold text-primary mt-3 mb-2">
                            Adresa
                        </div>
                        <div className="mb-1">
                            <span className="text-muted">
                                {patient.address ? (
                                    <>
                                        {patient.address.street && (
                                            <>{patient.address.street}, </>
                                        )}
                                        {patient.address.city && (
                                            <>{patient.address.city}, </>
                                        )}
                                        {patient.address.zip && (
                                            <>{patient.address.zip}</>
                                        )}
                                    </>
                                ) : (
                                    <EmptyFieldMessage />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailCard;
