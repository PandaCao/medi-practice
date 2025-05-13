// pages/PatientDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { ROUTES } from '../config/routes';
import { patientApi } from '../api';
import { getPatientExaminations } from '../api/examinationApi';
import { addPrescription } from '../api/prescriptionApi';
import ExaminationForm from '../components/examinations/ExaminationForm';
import PrescriptionForm from '../components/prescriptions/PrescriptionForm';
import PatientDetailCard from '../components/patients/PatientDetailCard';
import ExaminationList from '../components/examinations/ExaminationList';
import PrescriptionList from '../components/prescriptions/PrescriptionList';
import { usePermissions } from '../hooks/usePermissions';
import { PERMISSIONS } from '../config/permissions';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PatientDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hasPermission } = usePermissions();
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showExaminationForm, setShowExaminationForm] = useState(false);
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [examinations, setExaminations] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [showPrescriptionQr, setShowPrescriptionQr] = useState({
        show: false,
        qr: null,
    });

    useEffect(() => {
        const fetchPatientDetail = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await patientApi.getPatientDetail(id);
                console.log('API response:', data);

                if (!data) {
                    throw new Error('Nepodařilo se načíst data pacienta');
                }

                setPatient({
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    name: `${data.first_name} ${data.last_name}`,
                    personalId: data.birth_number,
                    sex: data.sex,
                    dateOfBirth: (() => {
                        const date = new Date(data.date_of_birth);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(
                            2,
                            '0',
                        );
                        const year = date.getFullYear();
                        return `${day}. ${month}. ${year}`;
                    })(),
                    insurance: data.insurance_id,
                    weight: data.weight,
                    height: data.height,
                    contact_info: data.contact_info,
                    address: data.address,
                    registrationDate: data.created_at,
                });

                try {
                    // Načtení vyšetření z API
                    const examinationsData = await getPatientExaminations(id);
                    setExaminations(examinationsData || []);
                } catch (examError) {
                    console.error('Error fetching examinations:', examError);
                    // Pokud se nepodaří načíst vyšetření, nastavíme prázdný seznam
                    setExaminations([]);
                }
                try {
                    // Načtení e-receptů z API
                    const prescriptionsData =
                        await patientApi.getPatientPrescriptions(id);
                    setPrescriptions(prescriptionsData || []);
                } catch (prescError) {
                    setPrescriptions([]);
                }
            } catch (err) {
                console.error('Error fetching patient detail:', err);
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        'Nepodařilo se načíst detail pacienta. Zkontrolujte připojení k serveru.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientDetail();
    }, [id]);

    const handleDelete = () => {
        // TODO: Implement delete functionality with API
        setShowDeleteModal(false);
        // Navigate back to previous page if available, else to patients list
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(ROUTES.PATIENTS);
        }
    };

    const handleUpdate = () => {
        navigate(`/patient/${patient.id}/edit`, {
            state: { patient },
        });
    };

    const handleCreatePrescription = async (prescriptionData) => {
        try {
            await addPrescription(prescriptionData);
            // Reload prescriptions after creation
            const prescriptionsData = await patientApi.getPatientPrescriptions(
                patient.id,
            );
            setPrescriptions(prescriptionsData || []);
            setShowPrescriptionForm(false);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Nepodařilo se vytvořit e-recept.',
            );
        }
    };

    const handleAddExamination = () => {
        setShowExaminationForm(true);
    };

    const handleExaminationSubmit = async () => {
        try {
            // Načteme všechna vyšetření znovu
            const examinationsData = await getPatientExaminations(patient.id);
            setExaminations(examinationsData || []);

            // Načteme e-recepty znovu, protože mohlo být vytvořeno nové vyšetření s e-receptem
            const prescriptionsData = await patientApi.getPatientPrescriptions(
                patient.id,
            );
            setPrescriptions(prescriptionsData || []);

            setShowExaminationForm(false);
        } catch (error) {
            console.error('Error updating lists after examination:', error);
            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Nepodařilo se aktualizovat seznamy po vytvoření vyšetření.',
            );
        }
    };

    const [editingExamination, setEditingExamination] = useState(null);

    const handleEditExamination = (examination) => {
        setEditingExamination(examination);
        setShowExaminationForm(true);
    };

    const handleShowPrescriptionQr = (prescription) => {
        setShowPrescriptionQr({ show: true, qr: prescription.qr_code });
    };

    if (isLoading) {
        return <LoadingSpinner showServerWakeupMessage={true} />;
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                <h4 className="alert-heading">Chyba při načítání dat</h4>
                <p>{error}</p>
                <hr />
                <p className="mb-0">
                    <Button
                        variant="outline-danger"
                        onClick={() => window.location.reload()}
                    >
                        Zkusit znovu
                    </Button>
                </p>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="alert alert-warning m-4" role="alert">
                <h4 className="alert-heading">Pacient nenalezen</h4>
                <p>Pacient s ID {id} nebyl nalezen v systému.</p>
                <hr />
                <p className="mb-0">
                    <Button
                        variant="outline-warning"
                        onClick={() => navigate(ROUTES.PATIENTS)}
                    >
                        Zpět na seznam pacientů
                    </Button>
                </p>
            </div>
        );
    }

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <PatientDetailCard
                patient={patient}
                onUpdate={handleUpdate}
                onDelete={() => setShowDeleteModal(true)}
                onERecept={() => setShowPrescriptionForm(true)}
                showEReceptButton={hasPermission(
                    PERMISSIONS.PRESCRIPTION_CREATE,
                )}
            />

            <hr className="my-4" />

            <Row className="mb-4">
                <Col>
                    <ExaminationList
                        examinations={examinations}
                        onAdd={handleAddExamination}
                        onEdit={handleEditExamination}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <PrescriptionList
                        prescriptions={prescriptions}
                        onAdd={() => setShowPrescriptionForm(true)}
                        onShowQr={handleShowPrescriptionQr}
                    />
                </Col>
            </Row>

            {/* Modals */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Smazat pacienta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Opravdu chcete smazat pacienta {patient.name}? Tato akce je
                    nevratná.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Zrušit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Smazat
                    </Button>
                </Modal.Footer>
            </Modal>

            <ExaminationForm
                show={showExaminationForm}
                onHide={() => {
                    setShowExaminationForm(false);
                    setEditingExamination(null);
                }}
                onSubmit={handleExaminationSubmit}
                patientId={patient.id}
                examination={editingExamination}
            />

            <PrescriptionForm
                show={showPrescriptionForm}
                onHide={() => setShowPrescriptionForm(false)}
                onSubmit={handleCreatePrescription}
                patient={patient}
            />

            <Modal
                show={showPrescriptionQr.show}
                onHide={() => setShowPrescriptionQr({ show: false, qr: null })}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>QR kód e-receptu</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {showPrescriptionQr.qr ? (
                        <img
                            src={showPrescriptionQr.qr}
                            alt="QR kód e-receptu"
                            style={{ maxWidth: '100%' }}
                        />
                    ) : (
                        <p>QR kód není k dispozici.</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PatientDetailPage;
