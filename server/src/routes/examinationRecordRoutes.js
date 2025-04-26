import express from 'express';
import {
    addExamination,
    updateExamination,
} from '../controllers/examinationRecordController.js';

const router = express.Router();

router.post('/', addExamination);
router.patch('/', updateExamination);

export default router;
