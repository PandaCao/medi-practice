import express from 'express';
import { addPatient, listPatients, getPatientById } from '../controllers/patientCardController.js';

const router = express.Router();

router.post('/', addPatient);
router.get('/list', listPatients);
router.get('/', getPatientById)

export default router;
