// pages/PatientDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Spinner, Button } from 'react-bootstrap';
import { ROUTES } from '../config/routes';
import { patientApi } from '../api';
import { getPatientExaminations, addExamination } from '../api/examinationApi';
import ExaminationForm from '../components/examinations/ExaminationForm';
import PrescriptionForm from '../components/prescriptions/PrescriptionForm';
import PatientDetailCard from '../components/patients/PatientDetailCard';
import DiagnosisList from '../components/patients/DiagnosisList';
import ExaminationList from '../components/examinations/ExaminationList';
import PatientAnamnesis from '../components/patients/PatientAnamnesis';
import PatientMedication from '../components/patients/PatientMedication';

// Komponenta pro zobrazení přehledu o pacientovi
const PatientDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showExaminationForm, setShowExaminationForm] = useState(false);
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [examinations, setExaminations] = useState([]);

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
                    dateOfBirth: data.date_of_birth,
                    insurance: data.insurance_id,
                    weight: data.weight,
                    height: data.height,
                    email: data.contact_info?.contact_email,
                    phone: data.contact_info?.contact_phone,
                    contactPerson: data.contact_info?.contact_person,
                    address: data.address,
                    diagnosis: data.diagnosis
                        ? [
                              {
                                  id: 1,
                                  code: 'DIABETES MELLITUS 2. TYPU (E11.9)',
                                  description:
                                      'Diagnostikováno 2020, kompenzace suboptimální, doporučena úprava medikace a režimová opatření.',
                              },
                              {
                                  id: 2,
                                  code: 'METABOLICKÝ SYNDROM (E88.81)',
                                  description:
                                      'Obezita, inzulínová rezistence, dyslipidémie a hypertenze, riziko CVD a DM2, doporučena změna životního stylu a farmakoterapie.',
                              },
                          ]
                        : [],
                    anamnesis: data.anamnesis,
                    medication: data.medication,
                    medicalRecord: data.medical_record,
                    registrationDate: new Date(
                        data.created_at,
                    ).toLocaleDateString('cs-CZ'),
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

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const handleDelete = () => {
        // TODO: Implement delete functionality with API
        setShowDeleteModal(false);
        navigate(ROUTES.PATIENTS);
    };

    const handleUpdate = () => {
        navigate(`/patient/${patient.id}/edit`, {
            state: { patient },
        });
    };

    const handleAddExamination = async (examinationData) => {
        try {
            await addExamination(examinationData);
            // Načteme všechna vyšetření znovu, abychom měli aktuální data
            const examinationsData = await getPatientExaminations(patient.id);
            setExaminations(examinationsData || []);
            setShowExaminationForm(false);
        } catch (error) {
            console.error('Error adding examination:', error);
            // TODO: Show error message to user
        }
    };

    const handleCreatePrescription = (prescriptionData) => {
        // TODO: Implement API call to save prescription
        console.log('Creating prescription:', prescriptionData);
        // Here you would typically make an API call to save the prescription
        // For now, we'll just log it to the console
    };

    if (isLoading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Načítání...</span>
                </Spinner>
            </div>
        );
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
        <>
            <PatientDetailCard
                patient={patient}
                onUpdate={handleUpdate}
                onDelete={() => setShowDeleteModal(true)}
                onERecept={() => setShowPrescriptionForm(true)}
            />

            <hr className="my-4" />

            <Row className="g-0 position-relative">
                <Col md={6} className="pe-md-4">
                    <DiagnosisList
                        diagnoses={patient.diagnosis}
                        onAdd={() => setShowDiagnosisForm(true)}
                        onEdit={(diagnosis) => {
                            // TODO: Implement edit functionality
                            console.log('Editing diagnosis:', diagnosis);
                        }}
                    />
                </Col>

                <div className="d-none d-md-block position-absolute start-50 top-0 bottom-0 border-start"></div>

                <Col md={6} className="ps-md-4 pt-4 pt-md-0">
                    <div className="position-relative">
                        <ExaminationList
                            examinations={examinations}
                            onAdd={() => setShowExaminationForm(true)}
                            onEdit={(examination) => {
                                // TODO: Implement edit functionality
                                console.log(
                                    'Editing examination:',
                                    examination,
                                );
                            }}
                        />
                    </div>
                </Col>
            </Row>

            <hr className="my-4" />

            <Row>
                <Col md={6}>
                    <PatientAnamnesis
                        anamnesis={patient.anamnesis}
                        onEdit={() => {
                            // TODO: Implement edit functionality
                            console.log('Editing anamnesis');
                        }}
                    />

                    <PatientMedication
                        medication={patient.medication}
                        onEdit={() => {
                            // TODO: Implement edit functionality
                            console.log('Editing medication');
                        }}
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
                onHide={() => setShowExaminationForm(false)}
                onSubmit={() => {
                    // Načteme všechna vyšetření znovu, abychom měli aktuální data
                    getPatientExaminations(patient.id).then(
                        (examinationsData) => {
                            setExaminations(examinationsData || []);
                            setShowExaminationForm(false);
                        },
                    );
                }}
                patientId={patient.id}
            />

            <PrescriptionForm
                show={showPrescriptionForm}
                onHide={() => setShowPrescriptionForm(false)}
                onSubmit={handleCreatePrescription}
                patient={patient}
            />
        </>
    );
};

export default PatientDetailPage;
