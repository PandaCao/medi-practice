import * as patientService from '../services/patientCardService.js';
import {
    getTrimmedBody,
    isValidBirthNumber,
    isOnlyLetters,
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

    try {
        const newPatient = await patientService.addPatient(body);
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getPatientById(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'id is required.' });
    }
    try {
        const patients = await patientService.getPatients({
            id: req.params.id,
        });
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function listPatients(req, res) {
    try {
        const params = {
            id: req.query.id || '',
            search: req.query.search || '',
            pageIndex: parseInt(req.query.pageIndex) || undefined,
            pageSize: parseInt(req.query.pageSize) || undefined,
        };
        const patients = await patientService.getPatients(params);
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updatePatient(req, res) {
    const body = getTrimmedBody(req.body);
    const required = ['id'];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newReservation = await patientService.updatePatient(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
