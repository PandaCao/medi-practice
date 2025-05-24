import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addExamination, updateExamination } from '../../api/examinationApi';
import { addPrescription } from '../../api/prescriptionApi';
import { PLACES } from '../../config/constants';
import StampPreview from '../common/StampPreview';
import SignaturePreview from '../common/SignaturePreview';
import DiagnosesFormSection from './DiagnosesFormSection';
import PrescriptionFormSection from './PrescriptionFormSection';
import { getUserId } from '../../tools/userHelper';

const ExaminationForm = ({
    show,
    onHide,
    onSubmit,
    patientId,
    doctorId = getUserId(),
    examination = null,
}) => {
    const [formData, setFormData] = useState({
        id: examination ? examination.id : undefined,
        patient_id: patientId || '',
        doctor_id: doctorId,
        examination_date: new Date().toISOString(),
        anamnesis: '',
        diagnosis_overview: '',
        lab_results: '',
        objective_findings: '',
        conclusions: '',
        recommendations: '',
        prescribed_medication: '',
        new_diagnosis: '',
        place: 'medipractise_praha',
        stamp: 'MediPractise Praha',
        doctors_signature: '',
    });

    const [createPrescription, setCreatePrescription] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState({
        medications: [
            {
                name: '',
                dosage: '',
                frequency: '',
                duration: '',
            },
        ],
        notes: '',
    });

    const [diagnoses, setDiagnoses] = useState([]);
    const [setShowStampModal] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);

    useEffect(() => {
        if (show) {
            if (examination) {
                setFormData({
                    id: examination.id,
                    patient_id: examination.patient_id || patientId,
                    doctor_id: examination.doctor_id || doctorId,
                    examination_date:
                        examination.examination_date ||
                        new Date().toISOString(),
                    anamnesis: examination.anamnesis || '',
                    diagnosis_overview: examination.diagnosis_overview || '',
                    lab_results: examination.lab_results || '',
                    objective_findings: examination.objective_findings || '',
                    conclusions: examination.conclusions || '',
                    recommendations: examination.recommendations || '',
                    prescribed_medication:
                        examination.prescribed_medication || '',
                    new_diagnosis: examination.new_diagnosis || '',
                    place: examination.place || 'medipractise_praha',
                    stamp: examination.stamp || 'MediPractise Praha',
                    doctors_signature: examination.doctors_signature || '',
                });

                // Pokud má vyšetření diagnózy, načteme je
                if (examination.diagnosis_overview) {
                    try {
                        const parsedDiagnoses = JSON.parse(
                            examination.diagnosis_overview,
                        );
                        setDiagnoses(
                            Array.isArray(parsedDiagnoses)
                                ? parsedDiagnoses
                                : [],
                        );
                    } catch (e) {
                        console.error('Error parsing diagnoses:', e);
                        setDiagnoses([]);
                    }
                } else {
                    setDiagnoses([]);
                }
            } else {
                setFormData({
                    patient_id: patientId,
                    doctor_id: doctorId,
                    examination_date: new Date().toISOString(),
                    anamnesis: '',
                    diagnosis_overview: '',
                    lab_results: '',
                    objective_findings: '',
                    conclusions: '',
                    recommendations: '',
                    prescribed_medication: '',
                    new_diagnosis: '',
                    place: 'medipractise_praha',
                    stamp: 'MediPractise Praha',
                    doctors_signature: '',
                });
                setDiagnoses([{ code: '', description: '' }]);
            }
        }
    }, [show, examination, patientId, doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDiagnosisChange = (index, e) => {
        const { name, value } = e.target;
        const newDiagnoses = [...diagnoses];
        newDiagnoses[index] = {
            ...newDiagnoses[index],
            [name]: value,
        };
        setDiagnoses(newDiagnoses);
        // Aktualizujeme diagnosis_overview v formData
        setFormData((prev) => ({
            ...prev,
            diagnosis_overview: JSON.stringify(newDiagnoses),
        }));
    };

    const handleAddDiagnosis = () => {
        const newDiagnoses = [...diagnoses, { code: '', description: '' }];
        setDiagnoses(newDiagnoses);
        setFormData((prev) => ({
            ...prev,
            diagnosis_overview: JSON.stringify(newDiagnoses),
        }));
    };

    const handleRemoveDiagnosis = (index) => {
        const newDiagnoses = diagnoses.filter((_, i) => i !== index);
        setDiagnoses(newDiagnoses);
        setFormData((prev) => ({
            ...prev,
            diagnosis_overview: JSON.stringify(newDiagnoses),
        }));
    };

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;
        const newMedications = [...prescriptionData.medications];
        newMedications[index] = {
            ...newMedications[index],
            [name]: value,
        };
        setPrescriptionData((prev) => ({
            ...prev,
            medications: newMedications,
        }));
    };

    const handleAddMedication = () => {
        setPrescriptionData((prev) => ({
            ...prev,
            medications: [
                ...prev.medications,
                { name: '', dosage: '', frequency: '', duration: '' },
            ],
        }));
    };

    const handleRemoveMedication = (index) => {
        setPrescriptionData((prev) => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pokud vytváříme e-recept a jsou zadány léky, nastav prescribed_medication
            let updatedFormData = { ...formData };
            if (
                createPrescription &&
                prescriptionData.medications.length > 0 &&
                prescriptionData.medications.some(
                    (med) => med.name.trim() !== '',
                )
            ) {
                const medicationNames = prescriptionData.medications
                    .filter((med) => med.name.trim() !== '')
                    .map((med) => med.name.trim())
                    .join(', ');
                updatedFormData.prescribed_medication = medicationNames;
            }

            if (examination) {
                await updateExamination(updatedFormData);
            } else {
                await addExamination(updatedFormData);
            }

            // Pokud vytváříme e-recept a jsou zadány léky, vytvoříme e-recept
            if (
                createPrescription &&
                prescriptionData.medications.length > 0 &&
                prescriptionData.medications.some(
                    (med) => med.name.trim() !== '',
                )
            ) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7); // 7 dní

                const prescriptionPayload = {
                    patient_id: patientId,
                    doctor_id: doctorId,
                    expiration_date: expirationDate.toISOString(),
                    medications: prescriptionData.medications.filter(
                        (med) => med.name.trim() !== '',
                    ),
                    notes: prescriptionData.notes,
                };

                await addPrescription(prescriptionPayload);
            }

            onSubmit();
        } catch (error) {
            console.error('Error submitting examination:', error);
        }
    };

    const handlePlaceChange = async (e) => {
        const placeId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            place: placeId,
            stamp: PLACES.find((p) => p.id === placeId)?.name || '',
        }));
    };

    const handleStampClick = () => {
        setShowStampModal(true);
    };

    const handleSignatureClick = () => {
        setShowSignatureModal(true);
    };

    const RequiredLabel = ({ children }) => (
        <Form.Label>
            {children} <span className="text-danger">*</span>
        </Form.Label>
    );

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {examination ? 'Upravit vyšetření' : 'Nové vyšetření'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <RequiredLabel>Anamnéza</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="anamnesis"
                            value={formData.anamnesis}
                            onChange={handleChange}
                            placeholder="Popište anamnézu pacienta"
                            required
                            maxLength={200}
                        />
                    </Form.Group>

                    <DiagnosesFormSection
                        diagnoses={diagnoses}
                        handleAddDiagnosis={handleAddDiagnosis}
                        handleDiagnosisChange={handleDiagnosisChange}
                        handleRemoveDiagnosis={handleRemoveDiagnosis}
                        RequiredLabel={RequiredLabel}
                    />

                    <Form.Group className="mb-3">
                        <Form.Label>Laboratorní výsledky</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="lab_results"
                            value={formData.lab_results}
                            onChange={handleChange}
                            placeholder="Zadejte laboratorní výsledky"
                            maxLength={350}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Objektivní nález</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="objective_findings"
                            value={formData.objective_findings}
                            onChange={handleChange}
                            placeholder="Popište objektivní nález"
                            maxLength={250}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Závěry</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="conclusions"
                            value={formData.conclusions}
                            onChange={handleChange}
                            placeholder="Zadejte závěry vyšetření"
                            required
                            maxLength={250}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Doporučení</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="recommendations"
                            value={formData.recommendations}
                            onChange={handleChange}
                            placeholder="Zadejte doporučení pro pacienta"
                            maxLength={350}
                        />
                    </Form.Group>

                    <PrescriptionFormSection
                        createPrescription={createPrescription}
                        setCreatePrescription={setCreatePrescription}
                        prescriptionData={prescriptionData}
                        setPrescriptionData={setPrescriptionData}
                        handleMedicationChange={handleMedicationChange}
                        handleAddMedication={handleAddMedication}
                        handleRemoveMedication={handleRemoveMedication}
                        RequiredLabel={RequiredLabel}
                        examination={examination}
                    />

                    <Form.Group className="mb-3">
                        <RequiredLabel>Místo vyšetření</RequiredLabel>
                        <Form.Select
                            name="place"
                            value={formData.place}
                            onChange={handlePlaceChange}
                            required
                        >
                            {PLACES.map((place) => (
                                <option key={place.id} value={place.id}>
                                    {place.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <RequiredLabel>Razítko</RequiredLabel>
                                <StampPreview
                                    text={
                                        PLACES.find(
                                            (p) => p.id === formData.place,
                                        )?.name || ''
                                    }
                                    onClick={handleStampClick}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <RequiredLabel>Podpis lékaře</RequiredLabel>
                                <SignaturePreview
                                    text={formData.doctors_signature}
                                    onClick={handleSignatureClick}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Zrušit
                    </Button>
                    <Button variant="primary" type="submit">
                        {examination ? 'Uložit změny' : 'Přidat vyšetření'}
                    </Button>
                </Modal.Footer>
            </Form>

            {/* Modal pro úpravu podpisu */}
            <Modal
                show={showSignatureModal}
                onHide={() => setShowSignatureModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Elektronický podpis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <RequiredLabel>Podpis lékaře</RequiredLabel>
                        <Form.Control
                            type="text"
                            value={formData.doctors_signature}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    doctors_signature: e.target.value,
                                }))
                            }
                            placeholder="Zadejte jméno lékaře"
                        />
                    </Form.Group>
                    <div className="mt-3">
                        <SignaturePreview text={formData.doctors_signature} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowSignatureModal(false)}
                    >
                        Zrušit
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setShowSignatureModal(false)}
                    >
                        Uložit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    );
};

export default ExaminationForm;
