import express from 'express';
import {
    addReservation,
    deleteReservation,
    getReservation,
    getReservationsList,
    updateReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

router.post('/', addReservation);
router.get('/', getReservation);
router.get('/list', getReservationsList);
router.patch('/', updateReservation);
router.delete('/', deleteReservation);

export default router;
