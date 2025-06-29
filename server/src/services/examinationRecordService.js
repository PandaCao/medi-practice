import * as examinationRecordModel from '../models/examinationRecordModel.js';

export async function addExamination(payload) {
    return await examinationRecordModel.insertExamination(payload);
}

export async function updateExamination(payload) {
    return await examinationRecordModel.updateExamination(payload);
}

export async function getAllExaminationsByPatientId(id) {
    return await examinationRecordModel.getAllExaminationsByPatientId(id);
}