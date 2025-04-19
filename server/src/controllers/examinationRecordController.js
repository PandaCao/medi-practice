import * as examinationRecordService from '../services/examinationRecordService.js';
import {
    isValidBirthNumber,
    isOnlyLetters,
    isPositiveNumber,
    isValidPhoneNumber,
    isValidPostCode,
} from '../utils/validator.js';

export async function addExamination(req, res) {
    const body = req.body;
    const required = [
        'patient_id',
        'doctor_id',
        'stamp',
        'doctors_signature',
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

    try {
        const newExamination = await examinationRecordService.addExamination(body);
        res.status(201).json(newExamination);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

