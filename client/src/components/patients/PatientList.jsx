import React from 'react';
import { Table, Button, Stack, Spinner } from 'react-bootstrap';
import { BsThreeDotsVertical, BsEnvelope, BsTelephone } from 'react-icons/bs';

const PatientList = ({
    patients,
    totalPages,
    currentPage,
    onPageChange,
    isLoading,
}) => {
    if (isLoading && patients.length === 0) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Načítání...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>DATUM REGISTRACE</th>
                        <th>JMÉNO A PŘÍJMENÍ</th>
                        <th>RODNÉ ČÍSLO</th>
                        <th>POJIŠŤOVNA</th>
                        <th>KONTAKT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={patient.id || index}>
                            <td>{patient.registrationDate}</td>
                            <td>{patient.name}</td>
                            <td>{patient.personalId}</td>
                            <td>{patient.insurance}</td>
                            <td>
                                {patient.contactType === 'email' && (
                                    <BsEnvelope />
                                )}
                                {patient.contactType === 'phone' && (
                                    <BsTelephone />
                                )}
                            </td>
                            <td>
                                <Button variant="link" className="p-0">
                                    <BsThreeDotsVertical />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
