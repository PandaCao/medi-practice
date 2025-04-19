import * as examinationRecordModel from '../models/examinationRecordModel.js';

export async function addExamination(payload) {
    return await examinationRecordModel.insertExamination(payload);
}
