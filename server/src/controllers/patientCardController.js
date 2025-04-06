import * as patientService from '../services/patientCardService.js';
import { isValidBirthNumber } from '../utils/validator.js';

export async function addPatient(req, res) {
    const body = req.body;
    const required = ['first_name', 'last_name', 'date_of_birth', 'birth_number', 'insurance_id', 'sex'];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    if (!isValidBirthNumber(body.birth_number)) {
        return res.status(400).json({ error: 'Invalid birth number format.' });
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
        const patients = await patientService.getPatients(req.body);
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
