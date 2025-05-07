import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import cs from 'date-fns/locale/cs';
import 'react-datepicker/dist/react-datepicker.css';

function DateTimePickerField({ selected, onChange }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Datum a čas rezervace</Form.Label>
            <DatePicker
                selected={selected}
                onChange={onChange}
                showTimeSelect
                locale={cs}
                dateFormat="dd.MM.yyyy, HH:mm"
                timeFormat="HH:mm"
                className="form-control"
                required
                minDate={new Date()}
                minTime={new Date()}
                maxTime={new Date().setHours(23, 59)}
            />
        </Form.Group>
    );
}

export default DateTimePickerField;
