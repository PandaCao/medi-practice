import * as reservationService from '../services/reservationService.js';
import { getTrimmedBody } from '../utils/examinationRecords.js';

export async function addReservation(req, res) {
    const body = getTrimmedBody(req.body);
    const required = [
        'patient_id',
        'nurse_id',
        'start_date',
        'end_date',
    ];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newReservation = await reservationService.addReservation(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getReservation(req, res) {
    const body = getTrimmedBody(req.body);
    const required = [
        'id'
    ];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newReservation = await reservationService.getReservation(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getReservationsList(req, res) {
    try {
        const newReservation = await reservationService.getReservationsList();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateReservation(req, res) {
    const body = getTrimmedBody(req.body);
    const required = [
        'patient_id',
        'nurse_id',
        'start_date',
        'end_date',
    ];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newReservation = await reservationService.updateReservation(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteReservation(req, res) {
    const body = getTrimmedBody(req.body);
    const required = [
        'id',
    ];

    for (const field of required) {
        if (!body[field]) {
            return res.status(400).json({ error: `${field} is required.` });
        }
    }

    try {
        const newReservation = await reservationService.deleteReservation(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

