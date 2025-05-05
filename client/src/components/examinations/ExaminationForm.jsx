import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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

    useEffect(() => {
        if (examination) {
            setFormData({
                patient_id: examination.patient_id || patientId,
                doctor_id: examination.doctor_id || doctorId,
                examination_date:
                    examination.examination_date || new Date().toISOString(),
                anamnesis: examination.anamnesis || '',
                diagnosis_overview: examination.diagnosis_overview || '',
                medication: examination.medication || '',
                lab_results: examination.lab_results || '',
                objective_findings: examination.objective_findings || '',
                conclusions: examination.conclusions || '',
                recommendations: examination.recommendations || '',
                prescribed_medication: examination.prescribed_medication || '',
                new_diagnosis: examination.new_diagnosis || '',
                place: examination.place || 'MediPractise',
                stamp: examination.stamp || 'xxx',
                doctors_signature: examination.doctors_signature || 'xxx',
            });
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
        }
    }, [examination, patientId, doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                        <RequiredLabel>Anamnéza</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="anamnesis"
                            value={formData.anamnesis}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Přehled diagnóz</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="diagnosis_overview"
                            value={formData.diagnosis_overview}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Medikace</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Laboratorní výsledky</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="lab_results"
                            value={formData.lab_results}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Objektivní nález</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="objective_findings"
                            value={formData.objective_findings}
                            onChange={handleChange}
                            required
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
                        <RequiredLabel>Doporučení</RequiredLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="recommendations"
                            value={formData.recommendations}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <RequiredLabel>Předepsaná medikace</RequiredLabel>
                        <Form.Control
                            type="text"
                            name="prescribed_medication"
                            value={formData.prescribed_medication}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nová diagnóza</Form.Label>
                        <Form.Control
                            type="text"
                            name="new_diagnosis"
                            value={formData.new_diagnosis}
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
