import * as patientModel from '../models/patientCardModel.js';

export async function addPatient(payload) {
    return await patientModel.insertPatient(payload);
}

export async function getPatients(query) {
    return await patientModel.fetchPatients(query);
}
