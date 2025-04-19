import express from 'express';
import { addExamination } from '../controllers/examinationRecordController.js';

const router = express.Router();

router.post('/add', addExamination);

export default router;
