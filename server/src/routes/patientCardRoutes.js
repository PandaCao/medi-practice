import express from 'express';
import { addPatient, listPatients, getPatientById, updatePatient } from '../controllers/patientCardController.js';

const router = express.Router();

router.post('/', addPatient);
router.get('/list', listPatients);
router.get('/', getPatientById)
router.patch('/', updatePatient)

export default router;
