import express from 'express';
import { deleteReservation } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/delete', deleteReservation);

export default router;
