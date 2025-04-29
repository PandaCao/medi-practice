import React from 'react';
import { Form } from 'react-bootstrap';

function ExaminationTypeSelect({ value, onChange , otherValue, onOtherChange}) {

    return (
        <Form.Group className="mb-3">
            <Form.Label>Typ vyšetření</Form.Label>
            <Form.Select
                name="examinationType"
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Vyberte typ vyšetření</option>
                <option value="preventivni prohlidka">Preventivní prohlídka</option>
                <option value="vysetreni">Vyšetření</option>
                <option value="krevní test">Krevní test</option>
                <option value="ultrazvuk">Ultrazvuk</option>
                <option value="rentgen">Rentgen</option>
                <option value="EKG">EKG</option>
            </Form.Select>
        </Form.Group>

    );
}

export default ExaminationTypeSelect;
