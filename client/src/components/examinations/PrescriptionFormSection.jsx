import React from 'react';
import { Button, Form } from 'react-bootstrap';

const PrescriptionFormSection = ({
  createPrescription,
  setCreatePrescription,
  prescriptionData,
  setPrescriptionData,
  handleMedicationChange,
  handleAddMedication,
  handleRemoveMedication,
  RequiredLabel,
  examination,
}) => {
  if (examination) return null;

  return (
    <div className="border-top pt-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 text-primary">Elektronický recept</h6>
        <Form.Check
          type="switch"
          id="create-prescription"
          label="Vytvořit e-recept"
          checked={createPrescription}
          onChange={(e) => setCreatePrescription(e.target.checked)}
          className="fw-bold"
        />
      </div>

      {createPrescription && (
        <>
          {prescriptionData.medications.map((medication, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <Form.Group className="mb-3">
                <RequiredLabel>Název léku</RequiredLabel>
                <Form.Control
                  type="text"
                  name="name"
                  value={medication.name}
                  onChange={(e) => handleMedicationChange(index, e)}
                  placeholder="Např. Paracetamol"
                  required
                  maxLength={200}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <RequiredLabel>Dávkování</RequiredLabel>
                <Form.Control
                  type="text"
                  name="dosage"
                  value={medication.dosage}
                  onChange={(e) => handleMedicationChange(index, e)}
                  placeholder="Např. 1 tableta"
                  required
                  maxLength={50}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <RequiredLabel>Frekvence</RequiredLabel>
                <Form.Control
                  type="text"
                  name="frequency"
                  value={medication.frequency}
                  onChange={(e) => handleMedicationChange(index, e)}
                  placeholder="Např. 3x denně"
                  required
                  maxLength={50}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <RequiredLabel>Délka užívání</RequiredLabel>
                <Form.Control
                  type="text"
                  name="duration"
                  value={medication.duration}
                  onChange={(e) => handleMedicationChange(index, e)}
                  placeholder="Např. 7 dní"
                  required
                  maxLength={100}
                />
              </Form.Group>
              {prescriptionData.medications.length > 1 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveMedication(index)}
                  className="mb-3"
                >
                  Odebrat lék
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline-primary"
            onClick={handleAddMedication}
            className="mb-3"
          >
            Přidat další lék
          </Button>

          <Form.Group className="mb-3">
            <Form.Label>Poznámky k e-receptu</Form.Label>
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
  );
};

export default PrescriptionFormSection;
