import * as examinationRecordService from '../services/examinationRecordService.js';
import { log } from '../app.js';
import { getTrimmedBody } from '../utils/validator.js';

export async function addExamination(req, res) {
    const body = getTrimmedBody(req.body);

    const required_params = [
        'patient_id',
        'doctor_id',
        'stamp',
        'doctors_signature',
    ];

    for (const field of required_params) {
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

export async function updateExamination(req, res) {
    const body = getTrimmedBody(req.body);

    const required_params = [
        'id',
        'patient_id',
        'doctor_id',
        'stamp',
        'doctors_signature',
    ];

    for (const field of required_params) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newExamination = await examinationRecordService.updateExamination(body);

        log.info('Examination record ' + body.id + ' was updated.');

        res.status(201).json(newExamination);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getAllExaminationsByPatientId(req, res) {
    const body = getTrimmedBody(req.body);

    const id = req.params.id

    if (!id) {
        return res.status(400).json({ error: 'id is required.' });
    }

    try {
        const newExamination = await examinationRecordService.getAllExaminationsByPatientId(id);

        log.info('Examination record ' + body.id + ' was updated.');

        res.status(201).json(newExamination);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

