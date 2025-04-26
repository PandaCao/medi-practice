import * as reservationService from '../services/reservationService.js';
import {
    isValidBirthNumber,
    isOnlyLetters,
    isPositiveNumber,
    isValidPhoneNumber,
    isValidPostCode,
} from '../utils/validator.js';

export async function deleteReservation(req, res) {
    const body = req.body;
    const required = [
        'id',
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
        const newReservation = await reservationService.deleteReservation(body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

