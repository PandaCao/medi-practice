import * as patientService from '../services/patientCardService.js';
import {
    isValidBirthNumber,
    isOnlyLetters,
    isPositiveNumber,
    isValidPhoneNumber,
    isValidPostCode,
} from '../utils/validator.js';

export async function addPatient(req, res) {
    const body = req.body;
    const required = [
        'first_name',
        'last_name',
        'date_of_birth',
        'birth_number',
        'insurance_id',
        'sex',
    ];
    const notRequired = [
        'contact_info.contact_phone',
        'weight',
        'height',
        'address.address_zip_code',
    ];

    for (let key in body) {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
        }
    }

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    if (!isValidBirthNumber(body.birth_number)) {
        return res.status(400).json({
            error: 'Invalid birth number format. Correct format: XXXXXX/XXXX',
        });
    }

    if (!isOnlyLetters(body.first_name)) {
        return res.status(400).json({
            error: 'Invalid first name format. Only letters are allowed.',
        });
    }

    if (!isOnlyLetters(body.last_name)) {
        return res.status(400).json({
            error: 'Invalid last name format. Only letters are allowed.',
        });
    }

    // Not required
    if (
        !isValidPhoneNumber(body.contact_info.contact_phone) &&
        body.contact_info.contact_phone != null
    ) {
        return res.status(400).json({
            error: 'Invalid phone number format. Correct format: +XXXXXXXXXXXX or XXXXXXXXX.',
        });
    }

    if (!isPositiveNumber(body.weight) && body.weight != null) {
        return res.status(400).json({
            error: 'Invalid weight format. Weight must be a positive number.',
        });
    }

    if (!isPositiveNumber(body.height) && body.height != null) {
        return res.status(400).json({
            error: 'Invalid height format. Height must be a positive number.',
        });
    }

    if (
        !isValidPostCode(body.address.address_zip_code) &&
        body.address.address_zip_code != null
    ) {
        return res.status(400).json({
            error: 'Invalid post code format. Correct format: XXX XX or XXXXX.',
        });
    }

    try {
        const newPatient = await patientService.addPatient(body);
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function listPatients(req, res) {
    try {
        const params = {
            id: req.query.id || '',
            rc: req.query.rc || '',
            search: req.query.search || '',
            pageIndex: parseInt(req.query.pageIndex) || 1,
            pageSize: parseInt(req.query.pageSize) || 10,
        };
        const patients = await patientService.getPatients(params);
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
