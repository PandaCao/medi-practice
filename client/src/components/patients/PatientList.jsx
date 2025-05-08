import React, { useState, useEffect } from 'react';
import { Table, Button, Stack, Card } from 'react-bootstrap';
import { BsEnvelope, BsTelephone, BsPeople, BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { getInsuranceCompanyName } from '../../config/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const PatientList = ({
    patients,
    totalPages,
    currentPage,
    onPageChange,
    isLoading,
    searchQuery,
}) => {
    const navigate = useNavigate();
    const [patientList, setPatientList] = useState([]);

    useEffect(() => {
        const sortedPatients = [...patients].sort((a, b) => {
            const dateA = a.registrationDate.split('/').reverse().join('-');
            const dateB = b.registrationDate.split('/').reverse().join('-');
            return new Date(dateB) - new Date(dateA);
        });

        setPatientList(sortedPatients);
    }, [patients]);

    const handleEmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handlePhone = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handlePatientClick = (patientId) => {
        navigate(ROUTES.PATIENT_DETAIL.replace(':id', patientId));
    };

    if (isLoading && patientList.length === 0) {
        return <LoadingSpinner showServerWakeupMessage={true} />;
    }

    if (!isLoading && patientList.length === 0) {
        return (
            <div className="text-center p-5">
                {searchQuery ? (
                    <>
                        <BsSearch size={48} className="text-muted mb-3" />
                        <h4 className="text-muted">
                            Nenalezeni žádní pacienti
                        </h4>
                        <p className="text-muted mb-4">
                            Zkuste upravit vyhledávací kritéria
                        </p>
                    </>
                ) : (
                    <>
                        <BsPeople size={48} className="text-muted mb-3" />
                        <h4 className="text-muted">
                            Zatím zde nejsou žádní pacienti
                        </h4>
                        <p className="text-muted mb-4">
                            Začněte přidáním prvního pacienta do systému
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => navigate(ROUTES.PATIENT_ADD)}
                        >
                            + Přidat prvního pacienta
                        </Button>
                    </>
                )}
            </div>
        );
    }

    const renderMobileCard = (patient) => (
        <Card className="mb-3" key={patient.personalId}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5
                            className="mb-1"
                            onClick={() => handlePatientClick(patient.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {patient.name}
                        </h5>
                        <div className="text-muted small">
                            {patient.personalId}
                        </div>
                    </div>
                    <Button variant="link" className="text-muted p-0">
                        {/* <BsThreeDotsVertical /> */}
                    </Button>
                </div>
                <div className="text-muted mb-2">
                    {getInsuranceCompanyName(patient.insurance)}
                </div>
                {(patient.phone || patient.email) && (
                    <div className="d-flex gap-2 flex-wrap">
                        {patient.phone && (
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="d-flex align-items-center contact-btn"
                                onClick={() => handlePhone(patient.phone)}
                            >
                                <BsTelephone className="me-1" />
                                {patient.phone}
                            </Button>
                        )}
                        {patient.email && (
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="d-flex align-items-center contact-btn"
                                onClick={() => handleEmail(patient.email)}
                            >
                                <BsEnvelope className="me-1" />
                                {patient.email}
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );

    const renderDesktopTable = () => (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>DATUM REGISTRACE</th>
                    <th>JMÉNO A PŘÍJMENÍ</th>
                    <th>RODNÉ ČÍSLO</th>
                    <th>POJIŠŤOVNA</th>
                    <th>KONTAKTY</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {patientList.map((patient) => (
                    <tr
                        key={patient.personalId}
                        onClick={() => handlePatientClick(patient.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td>{patient.registrationDate}</td>
                        <td>{patient.name}</td>
                        <td>{patient.personalId}</td>
                        <td>{getInsuranceCompanyName(patient.insurance)}</td>
                        <td>
                            {!patient.phone && !patient.email ? (
                                <span className="text-muted small">-</span>
                            ) : (
                                <div className="d-flex gap-2">
                                    {patient.phone && (
                                        <Button
                                            variant="link"
                                            className="contact-icon p-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePhone(patient.phone);
                                            }}
                                            title={patient.phone}
                                        >
                                            <BsTelephone className="text-primary" />
                                        </Button>
                                    )}
                                    {patient.email && (
                                        <Button
                                            variant="link"
                                            className="contact-icon p-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEmail(patient.email);
                                            }}
                                            title={patient.email}
                                        >
                                            <BsEnvelope className="text-primary" />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </td>
                        <td className="text-end">
                            <Button
                                variant="link"
                                className="text-muted p-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/*<BsThreeDotsVertical />*/}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <div>
            <div className="d-none d-lg-block">{renderDesktopTable()}</div>
            <div className="d-lg-none">{patientList.map(renderMobileCard)}</div>

            {totalPages > 1 && (
                <Stack
                    direction="horizontal"
                    className="justify-content-between align-items-center mt-4"
                >
                    <div className="pagination-controls">
                        <Button
                            variant="link"
                            className="text-secondary"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1 || isLoading}
                        >
                            Předchozí
                        </Button>
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <Button
                                key={page}
                                variant={
                                    page === currentPage ? 'primary' : 'link'
                                }
                                className={
                                    page !== currentPage && 'text-secondary'
                                }
                                onClick={() => onPageChange(page)}
                                disabled={isLoading}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="link"
                            className="text-secondary"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || isLoading}
                        >
                            Další
                        </Button>
                    </div>
                    <small className="text-secondary">
                        Stránka {currentPage} z {totalPages}
                    </small>
                </Stack>
            )}
        </div>
    );
};

export default PatientList;
