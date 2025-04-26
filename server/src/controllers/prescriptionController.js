import * as prescriptionService from '../services/prescriptionService.js';
import { getTrimmedBody } from '../utils/validator.js';
import QRCode from 'qrcode'
import { log } from '../app.js';

function validateRequiredFields(body, fields) {
    for (const field of fields) {
        if (!body[field]) {
            throw new Error(`${field} is required.`);
        }
    }
}

function preparePrescriptionBody(input) {
    const body = getTrimmedBody(input);
    const createdAt = new Date();

    body['created_at'] = createdAt.toISOString();
    body['expiration_date'] = new Date(createdAt.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
    body['qr_code'] = QRCode.toDataURL(JSON.stringify(body));

    return body;
}

export async function addPrescription(req, res) {
    try {
        validateRequiredFields(req.body, ['patient_id', 'doctor_id', 'medications']);
        const body = preparePrescriptionBody(req.body);

        const newPrescription = await prescriptionService.addPrescription(body);
        res.status(201).json(newPrescription);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export async function getPrescription(req, res) {
    const body = getTrimmedBody(req.body);

    if (!body['id']) {
        return res.status(400).json({ error: `id is required.` });
    }

    try {
        const newReservation = await prescriptionService.getPrescriptionById(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getPrescriptionsByPatientId(req, res) {
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ error: 'id is required.' });
    }

    try {
        const newReservation = await prescriptionService.getPrescriptionsByPatientId(id);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}