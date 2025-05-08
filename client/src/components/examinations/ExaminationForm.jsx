import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { addExamination, updateExamination } from '../../api/examinationApi';
import { addPrescription } from '../../api/prescriptionApi';

const PLACES = [
    { id: 'medipractise_praha', name: 'MediPractise Praha' },
    { id: 'medipractise_brno', name: 'MediPractise Brno' },
    { id: 'medipractise_ostrava', name: 'MediPractise Ostrava' },
    { id: 'medipractise_plzen', name: 'MediPractise Plzeň' },
];

const StampPreview = ({ text, onClick }) => (
    <div
        onClick={onClick}
        className="border rounded p-2 text-center cursor-pointer hover-bg-light"
        style={{
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            transition: 'all 0.2s ease-in-out',
        }}
    >
        {text ? (
            <div
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '1.2rem',
                    color: '#dc3545',
                    transform: 'rotate(-5deg)',
                    border: '2px solid #dc3545',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                {text}
            </div>
        ) : (
            <div className="text-muted">Klikněte pro přidání razítka</div>
        )}
    </div>
);

const SignaturePreview = ({ text, onClick }) => (
    <div
        onClick={onClick}
        className="border rounded p-2 text-center cursor-pointer hover-bg-light"
        style={{
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            transition: 'all 0.2s ease-in-out',
        }}
    >
        {text ? (
            <div
                style={{
                    fontFamily: 'Brush Script MT, cursive',
                    fontSize: '1.5rem',
                    color: '#000',
                    borderBottom: '2px solid #000',
                    padding: '0 20px',
                }}
            >
                {text}
            </div>
        ) : (
            <div className="text-muted">Klikněte pro přidání podpisu</div>
        )}
    </div>
);

const ExaminationForm = ({
    show,
    onHide,
    onSubmit,
    patientId,
    doctorId = 'd6574103-a485-4eba-a536-d4dcbb3f2077', // Default doctor ID until we have authentication
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
        stamp: '',
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
    const [showStampModal, setShowStampModal] = useState(false);
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
                    stamp: examination.stamp || '',
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
                    stamp: '',
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
            if (examination) {
                await updateExamination(formData);
            } else {
                await addExamination(formData);
            }

            // If prescription is enabled and there's prescribed medication, create e-prescription
            if (
                createPrescription &&
                prescriptionData.medications.length > 0 &&
                prescriptionData.medications.some(
                    (med) => med.name.trim() !== '',
                )
            ) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7); // default 7 days

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

    const handlePlaceChange = (e) => {
        const placeId = e.target.value;
        setFormData((prev) => ({
            ...prev,
            place: placeId,
            // stamp is visual only, set according to place name
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
                        <Form.Label>Anamnéza</Form.Label>
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

                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label>Diagnózy</Form.Label>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={handleAddDiagnosis}
                                className="d-inline-flex align-items-center gap-2"
                            >
                                <BsPlus />
                                Přidat diagnózu
                            </Button>
                        </div>
                        {diagnoses.map((diagnosis, index) => (
                            <div
                                key={index}
                                className="mb-3 position-relative border rounded p-3"
                            >
                                {index > 0 && (
                                    <Button
                                        variant="link"
                                        className="position-absolute end-0 top-0 text-danger p-0"
                                        onClick={() =>
                                            handleRemoveDiagnosis(index)
                                        }
                                    >
                                        <BsTrash />
                                    </Button>
                                )}
                                <Form.Group className="mb-3">
                                    <RequiredLabel>Kód diagnózy</RequiredLabel>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        value={diagnosis.code}
                                        onChange={(e) =>
                                            handleDiagnosisChange(index, e)
                                        }
                                        placeholder="Např. DIABETES MELLITUS 2. TYPU (E11.9)"
                                        required
                                        maxLength={100}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Popis</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="description"
                                        value={diagnosis.description}
                                        onChange={(e) =>
                                            handleDiagnosisChange(index, e)
                                        }
                                        placeholder="Popis diagnózy a doporučení"
                                        maxLength={200}
                                    />
                                </Form.Group>
                            </div>
                        ))}
                    </div>

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
                        <Form.Label>Závěry</Form.Label>
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

                    {!examination && (
                        <div className="border-top pt-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="mb-0 text-primary">
                                    Elektronický recept
                                </h6>
                                <Form.Check
                                    type="switch"
                                    id="create-prescription"
                                    label="Vytvořit e-recept"
                                    checked={createPrescription}
                                    onChange={(e) =>
                                        setCreatePrescription(e.target.checked)
                                    }
                                    className="fw-bold"
                                />
                            </div>

                            {createPrescription && (
                                <>
                                    {prescriptionData.medications.map(
                                        (medication, index) => (
                                            <div
                                                key={index}
                                                className="border rounded p-3 mb-3"
                                            >
                                                <Form.Group className="mb-3">
                                                    <RequiredLabel>
                                                        Název léku
                                                    </RequiredLabel>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={medication.name}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        placeholder="Např. Paracetamol"
                                                        required
                                                        maxLength={200}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <RequiredLabel>
                                                        Dávkování
                                                    </RequiredLabel>
                                                    <Form.Control
                                                        type="text"
                                                        name="dosage"
                                                        value={
                                                            medication.dosage
                                                        }
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        placeholder="Např. 1 tableta"
                                                        required
                                                        maxLength={50}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <RequiredLabel>
                                                        Frekvence
                                                    </RequiredLabel>
                                                    <Form.Control
                                                        type="text"
                                                        name="frequency"
                                                        value={
                                                            medication.frequency
                                                        }
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        placeholder="Např. 3x denně"
                                                        required
                                                        maxLength={50}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <RequiredLabel>
                                                        Délka užívání
                                                    </RequiredLabel>
                                                    <Form.Control
                                                        type="text"
                                                        name="duration"
                                                        value={
                                                            medication.duration
                                                        }
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                index,
                                                                e,
                                                            )
                                                        }
                                                        placeholder="Např. 7 dní"
                                                        required
                                                        maxLength={100}
                                                    />
                                                </Form.Group>
                                                {prescriptionData.medications
                                                    .length > 1 && (
                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            handleRemoveMedication(
                                                                index,
                                                            )
                                                        }
                                                        className="mb-3"
                                                    >
                                                        Odebrat lék
                                                    </Button>
                                                )}
                                            </div>
                                        ),
                                    )}
                                    <Button
                                        variant="outline-primary"
                                        onClick={handleAddMedication}
                                        className="mb-3"
                                    >
                                        Přidat další lék
                                    </Button>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Poznámky k e-receptu
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            name="notes"
                                            value={prescriptionData.notes}
                                            onChange={(e) =>
                                                setPrescriptionData((prev) => ({
                                                    ...prev,
                                                    notes: e.target.value,
                                                }))
                                            }
                                            placeholder="Doplňující informace k e-receptu"
                                            maxLength={300}
                                        />
                                    </Form.Group>
                                </>
                            )}
                        </div>
                    )}

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

            {/* Modal pro úpravu razítka */}
            <Modal
                show={showStampModal}
                onHide={() => setShowStampModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Elektronické razítko</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Text razítka</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.stamp}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    stamp: e.target.value,
                                }))
                            }
                            placeholder="Např. MediPractise Praha"
                        />
                    </Form.Group>
                    <div className="mt-3">
                        <StampPreview text={formData.stamp} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowStampModal(false)}
                    >
                        Zrušit
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setShowStampModal(false)}
                    >
                        Uložit
                    </Button>
                </Modal.Footer>
            </Modal>

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
                        <Form.Label>Podpis lékaře</Form.Label>
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
