import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { reservationApi, patientApi } from '../api';
import ReservationTable from '../components/reservations/ReservationTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

function AppointmentsPage() {
    const [reservations, setReservations] = useState([]);
    const [patientsMap, setPatientsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodaysReservations = async () => {
            setLoading(true);
            setError(null);
            try {
                const allReservations =
                    await reservationApi.getReservationsList();

                // Filter reservations for today
                const today = new Date();
                const startOfDay = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                );
                const endOfDay = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 1,
                );

                const todaysReservations = allReservations.filter((res) => {
                    const startDate = new Date(res.start_date);
                    return startDate >= startOfDay && startDate < endOfDay;
                });

                setReservations(todaysReservations);

                // Fetch patient details
                const uniquePatientIds = [
                    ...new Set(todaysReservations.map((r) => r.patient_id)),
                ];
                const patientDetailsArray = await Promise.all(
                    uniquePatientIds.map((id) =>
                        patientApi.getPatientDetail(id).catch(() => null),
                    ),
                );
                const patientMap = {};
                patientDetailsArray.forEach((patient) => {
                    if (patient) {
                        patientMap[patient.id] = patient;
                    }
                });
                setPatientsMap(patientMap);
            } catch (err) {
                setError('Chyba při načítání dnešních rezervací.');
            } finally {
                setLoading(false);
            }
        };

        fetchTodaysReservations();
    }, []);

    return (
        <Container className="py-4">
            <h2 className="mb-4">Dnešní schůzky</h2>
            {loading && <LoadingSpinner showServerWakeupMessage={true} />}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && reservations.length === 0 && (
                <p>Žádné dnešní rezervace k zobrazení.</p>
            )}
            {!loading && !error && reservations.length > 0 && (
                <ReservationTable
                    reservations={reservations}
                    patientsMap={patientsMap}
                />
            )}
        </Container>
    );
}

export default AppointmentsPage;
