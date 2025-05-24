import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Alert } from 'react-bootstrap';
import ReservationForm from '../components/reservations/ReservationForm';
import ReservationTable from '../components/reservations/ReservationTable';
import { reservationApi, patientApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getUserId } from '../tools/userHelper';

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
                const reservationsData =
                    await reservationApi.getReservationsList();
                setReservations(reservationsData);

                // Extract unique patient IDs
                const uniquePatientIds = [
                    ...new Set(reservationsData.map((r) => r.patient_id)),
                ];

                // Fetch patient details in parallel
                const patientDetailsArray = await Promise.all(
                    uniquePatientIds.map((id) =>
                        patientApi.getPatientDetail(id).catch(() => null),
                    ),
                );

                // Create map of patient_id to patient details
                const patientMap = {};
                patientDetailsArray.forEach((patient) => {
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
            const startDate = formData.reservationDate; // This is now the selected time slot
            const durationMinutes = parseInt(formData.duration, 10) || 0;
            const endDate = new Date(
                startDate.getTime() + durationMinutes * 60000,
            );

            // Create ISO string that preserves local time
            const formatDateToISO = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
            };

            const payload = {
                patient_id: formData.patientId,
                nurse_id: getUserId(),
                start_date: formatDateToISO(startDate),
                end_date: formatDateToISO(endDate),
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

            const uniquePatientIds = [
                ...new Set(reservationsData.map((r) => r.patient_id)),
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
        } catch (error) {
            console.error('Error creating reservation:', error);
            throw error;
        }
    };

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Container fluid className="py-4 flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Rezervační systém</h2>
                    <Button
                        variant="primary"
                        onClick={() => setShowFormModal(true)}
                    >
                        Přidat rezervaci
                    </Button>
                </div>

                {loading && <LoadingSpinner showServerWakeupMessage={true} />}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && reservations.length === 0 && (
                    <Alert variant="info" className="text-center py-4">
                        <i className="bi bi-calendar-plus fs-1 mb-3 d-block"></i>
                        <h4>Žádné rezervace</h4>
                        <p className="text-muted mb-3">
                            Zatím nemáte žádné zarezervované schůzky. Můžete
                            přidat novou rezervaci kliknutím na tlačítko "Přidat
                            rezervaci" v pravém horním rohu.
                        </p>
                    </Alert>
                )}
                {!loading && !error && reservations.length > 0 && (
                    <ReservationTable
                        reservations={reservations}
                        patientsMap={patientsMap}
                    />
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
        </div>
    );
}

export default ReservationsPage;
