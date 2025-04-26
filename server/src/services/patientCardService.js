import * as patientModel from '../models/patientCardModel.js';

export async function addPatient(payload) {
    return await patientModel.insertPatient(payload);
}

export async function getPatients(payload) {
    return await patientModel.fetchPatients(payload);
}

export async function updatePatient(payload) {
    return await patientModel.updatePatientCard(payload);
}

