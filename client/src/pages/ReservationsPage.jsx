import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import ReservationForm from '../components/reservations/ReservationForm';
import ReservationTable from '../components/reservations/ReservationTable';
import { reservationApi, patientApi } from '../api';
import { Link } from 'react-router-dom';

const DEFAULT_NURSE_ID = 'f842a3be-b7c7-4c69-ad9a-74a2cd94db3c';

function ReservationsPage() {
    const [formData, setFormData] = useState({
        patientId: '',
        examinationType: '',
        reservationDate: new Date(),
        duration: '',
        notes: '',
    });

    const [reservations, setReservations] = useState([]);
    const [patientsMap, setPatientsMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        const fetchReservationsAndPatients = async () => {
            setLoading(true);
            setError(null);
            try {
                const reservationsData = await reservationApi.getReservationsList();
                setReservations(reservationsData);

                // Extract unique patient IDs
                const uniquePatientIds = [...new Set(reservationsData.map(r => r.patient_id))];

                // Fetch patient details in parallel
                const patientDetailsArray = await Promise.all(
                    uniquePatientIds.map(id => patientApi.getPatientDetail(id).catch(() => null))
                );

                // Create map of patient_id to patient details
                const patientMap = {};
                patientDetailsArray.forEach(patient => {
                    if (patient) {
                        patientMap[patient.id] = patient;
                    }
                });
                setPatientsMap(patientMap);
            } catch (err) {
                setError('Chyba při načítání rezervací nebo pacientů.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservationsAndPatients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            reservationDate: date,
        }));
    };

    const handleSubmit = async (formData) => {
        try {
            // Prepare payload for API with duration added to start_date for end_date
            const startDate = formData.reservationDate;
            const durationMinutes = parseInt(formData.duration, 10) || 0;
            const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

            const payload = {
                patient_id: formData.patientId,
                nurse_id: DEFAULT_NURSE_ID,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                examination_type: formData.examinationType,
                notes: formData.notes,
            };

            await reservationApi.createReservation(payload);

            setModalMessage('Rezervace byla úspěšně vytvořená!');
            setShowModal(true);
            setShowFormModal(false);

            // Refresh reservations and patients
            const reservationsData = await reservationApi.getReservationsList();
            setReservations(reservationsData);

            const uniquePatientIds = [...new Set(reservationsData.map(r => r.patient_id))];
            const patientDetailsArray = await Promise.all(
                uniquePatientIds.map(id => patientApi.getPatientDetail(id).catch(() => null))
            );
            const patientMap = {};
            patientDetailsArray.forEach(patient => {
                if (patient) {
                    patientMap[patient.id] = patient;
                }
            });
            setPatientsMap(patientMap);
        } catch (error) {
            console.error('Error creating reservation:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setModalMessage(`${error.response.data.error === 'Reservation already exists' ? 'Vybraný čas je již obsazen. Zvolte prosím jiný čas.' : error.response.data.error}`);
            } else {
                setModalMessage('Rezervace nebyla vytvořená.');
            }
            setShowModal(true);
        }
    };

    return (
        <>
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Rezervační systém</h2>
                    <Button variant="primary" onClick={() => setShowFormModal(true)}>
                        Přidat rezervaci
                    </Button>
                </div>

                {loading && <p>Načítání rezervací...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && reservations.length === 0 && <p>Žádné rezervace k zobrazení.</p>}
                {!loading && !error && reservations.length > 0 && (
                    <ReservationTable reservations={reservations} patientsMap={patientsMap} />
                )}
            </Container>

            <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Přidat rezervaci</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReservationForm
                        formData={formData}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onDateChange={handleDateChange}
                    />
                </Modal.Body>
            </Modal>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upozornění</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowModal(false)}
                    >
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReservationsPage;
