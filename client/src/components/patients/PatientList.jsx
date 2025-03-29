import React from 'react';
import { Table, Button, Stack } from 'react-bootstrap';
import {
    BsThreeDotsVertical,
    BsEnvelope,
    BsTelephone,
    BsChatLeft,
} from 'react-icons/bs';
import { patients } from '../../data/patients';

const PatientList = ({ searchQuery }) => {
    const filteredPatients = patients.filter((patient) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            patient.name.toLowerCase().includes(searchLower) ||
            patient.personalId.toLowerCase().includes(searchLower)
        );
    });

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
                    {filteredPatients.map((patient, index) => (
                        <tr key={index}>
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

            <Stack
                direction="horizontal"
                className="justify-content-between align-items-center mt-4"
            >
                <div className="pagination-controls">
                    <Button variant="link" className="text-secondary">
                        Předchozí
                    </Button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <Button
                            key={page}
                            variant={page === 2 ? 'primary' : 'link'}
                            className={page !== 2 && 'text-secondary'}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button variant="link" className="text-secondary">
                        ...
                    </Button>
                    <Button variant="link" className="text-secondary">
                        10
                    </Button>
                    <Button variant="link" className="text-secondary">
                        Další
                    </Button>
                </div>
                <small className="text-secondary">Stránka 2 z 34</small>
            </Stack>
        </div>
    );
};

export default PatientList;
