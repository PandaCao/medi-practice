import express from 'express';
import { addPatient, listPatients } from '../controllers/patientCardController.js';

const router = express.Router();

router.post('/add', addPatient);
router.get('/list', listPatients);

export default router;
