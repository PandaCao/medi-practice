import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';

// Komponenta pro sekci diagnóz ve formuláři vyšetření
const DiagnosesFormSection = ({
    diagnoses,
    handleAddDiagnosis,
    handleDiagnosisChange,
    handleRemoveDiagnosis,
    RequiredLabel,
}) => (
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
        <div>
            {diagnoses.map((diagnosis, index) => (
                <div
                    key={index}
                    className="mb-3 position-relative border rounded p-3"
                >
                    {index > 0 && (
                        <Button
                            variant="link"
                            className="position-absolute end-0 top-0 text-danger p-0"
                            onClick={() => handleRemoveDiagnosis(index)}
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
                            onChange={(e) => handleDiagnosisChange(index, e)}
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
                            onChange={(e) => handleDiagnosisChange(index, e)}
                            placeholder="Popis diagnózy a doporučení"
                            maxLength={200}
                        />
                    </Form.Group>
                </div>
            ))}
        </div>
    </div>
);

export default DiagnosesFormSection;
