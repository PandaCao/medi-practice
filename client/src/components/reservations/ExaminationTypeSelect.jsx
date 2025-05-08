import React from 'react';
import { Form } from 'react-bootstrap';

function ExaminationTypeSelect({
    value,
    onChange,
    otherValue,
    onOtherChange,
    isInvalid,
    error,
    label,
}) {
    return (
        <Form.Group className="mb-3">
            {label || <Form.Label>Typ vyšetření</Form.Label>}
            <Form.Select
                name="examinationType"
                value={value}
                onChange={onChange}
                required
                isInvalid={isInvalid}
            >
                <option value="">Vyberte typ vyšetření</option>
                <option value="Preventivní prohlídka">
                    Preventivní prohlídka
                </option>
                <option value="Vyšetření">Vyšetření</option>
                <option value="Krevní test">Krevní test</option>
                <option value="Ultrazvuk">Ultrazvuk</option>
                <option value="Rentgen">Rentgen</option>
                <option value="EKG">EKG</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default ExaminationTypeSelect;
