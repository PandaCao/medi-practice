import React from 'react';
import { Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ReservationTable = ({ reservations, patientsMap }) => {
    const location = useLocation();

    if (!reservations || reservations.length === 0) {
        return <p>Žádné rezervace k zobrazení.</p>;
    }

    return (
        <Table responsive hover size="sm">
            <thead>
                <tr>
                    <th>Pacient</th>
                    <th>Rodné číslo</th>
                    <th>Typ vyšetření</th>
                    <th>Začátek</th>
                    <th>Konec</th>
                    <th>Poznámky</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((res) => {
                    const patient = patientsMap[res.patient_id];
                    return (
                        <tr key={res.id}>
                            <td>
                                {patient ? (
                                    <Link
                                        to={`/patient/${patient.id}`}
                                        state={{ fromPage: location.pathname }}
                                    >
                                        {patient.first_name} {patient.last_name}
                                    </Link>
                                ) : (
                                    res.patient_id
                                )}
                            </td>
                            <td>{patient ? patient.birth_number : 'N/A'}</td>
                            <td>{res.examination_type}</td>
                            <td>{new Date(res.start_date).toLocaleString()}</td>
                            <td>{new Date(res.end_date).toLocaleString()}</td>
                            <td>{res.notes}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ReservationTable;
