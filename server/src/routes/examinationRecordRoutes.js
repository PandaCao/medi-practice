import express from 'express';
import {
    addExamination,
    getAllExaminationsByPatientId,
    updateExamination,
} from '../controllers/examinationRecordController.js';

const router = express.Router();

router.post('/', addExamination);
router.patch('/', updateExamination);
router.get('/', getAllExaminationsByPatientId);

export default router;
