import * as prescriptionModel from '../models/prescriptionModel.js';

export async function addPrescription(payload) {
    return await prescriptionModel.addPrescription(payload);
}

export async function getPrescriptionById(payload) {
    return await prescriptionModel.getPrescriptionById(payload);
}

export async function getPrescriptionsByPatientId(payload) {
    return await prescriptionModel.getPrescriptionsByPatientId(payload);
}

