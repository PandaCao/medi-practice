import express from 'express';
import { addPatient, listPatients, getPatientById, updatePatient } from '../controllers/patientCardController.js';
import { getPrescriptionsByPatientId } from '../controllers/prescriptionController.js';
import { getAllExaminationsByPatientId } from '../controllers/examinationRecordController.js';

const router = express.Router();

router.post('/', addPatient);
router.get('/list', listPatients);
router.get('/:id', getPatientById)
router.get('/:id/examinations', getAllExaminationsByPatientId)
router.get('/:id/prescriptions', getPrescriptionsByPatientId)
router.patch('/', updatePatient)

export default router;
