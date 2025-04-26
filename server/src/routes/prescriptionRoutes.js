import express from 'express';
import {
    addPrescription,
    getPrescription
} from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/', addPrescription);
router.get('/', getPrescription);

export default router;
