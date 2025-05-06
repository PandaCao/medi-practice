import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { addExamination, updateExamination } from '../../api/examinationApi';

const ExaminationForm = ({
    show,
    onHide,
    onSubmit,
    patientId,
    doctorId = 'd6574103-a485-4eba-a536-d4dcbb3f2077', // Default doctor ID until we have authentication
    examination = null,
}) => {
    const [formData, setFormData] = useState({
        patient_id: patientId || '',
        doctor_id: doctorId,
        examination_date: new Date().toISOString(),
        anamnesis: '',
        diagnosis_overview: '',
        medication: '',
        lab_results: '',
        objective_findings: '',
        conclusions: '',
        recommendations: '',
        prescribed_medication: '',
        new_diagnosis: '',
        place: 'MediPractise',
        stamp: 'xxx',
        doctors_signature: 'xxx',
    });

    const [diagnoses, setDiagnoses] = useState([]);

    useEffect(() => {
        if (show) {
            if (examination) {
                setFormData({
                    patient_id: examination.patient_id || patientId,
                    doctor_id: examination.doctor_id || doctorId,
                    examination_date:
                        examination.examination_date ||
                        new Date().toISOString(),
                    anamnesis: examination.anamnesis || '',
                    diagnosis_overview: examination.diagnosis_overview || '',
                    medication: examination.medication || '',
                    lab_results: examination.lab_results || '',
                    objective_findings: examination.objective_findings || '',
                    conclusions: examination.conclusions || '',
                    recommendations: examination.recommendations || '',
                    prescribed_medication:
                        examination.prescribed_medication || '',
                    new_diagnosis: examination.new_diagnosis || '',
                    place: examination.place || 'MediPractise',
                    stamp: examination.stamp || 'xxx',
                    doctors_signature: examination.doctors_signature || 'xxx',
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
                    medication: '',
                    lab_results: '',
                    objective_findings: '',
                    conclusions: '',
                    recommendations: '',
                    prescribed_medication: '',
                    new_diagnosis: '',
                    place: 'MediPractise',
                    stamp: 'xxx',
                    doctors_signature: 'xxx',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (examination) {
                await updateExamination(formData);
            } else {
                await addExamination(formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting examination:', error);
        }
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
                                    <Form.Label>Kód diagnózy</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        value={diagnosis.code}
                                        onChange={(e) =>
                                            handleDiagnosisChange(index, e)
                                        }
                                        placeholder="Např. DIABETES MELLITUS 2. TYPU (E11.9)"
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
                                    />
                                </Form.Group>
                            </div>
                        ))}
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Medikace</Form.Label>
                        <Form.Control
                            type="text"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Laboratorní výsledky</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="lab_results"
                            value={formData.lab_results}
                            onChange={handleChange}
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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Předepsaná medikace</Form.Label>
                        <Form.Control
                            type="text"
                            name="prescribed_medication"
                            value={formData.prescribed_medication}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Místo</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Razítko</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="stamp"
                            value={formData.stamp}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Podpis lékaře</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="doctors_signature"
                            value={formData.doctors_signature}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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
        </Modal>
    );
};

export default ExaminationForm;
