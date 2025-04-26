import { getAllRowsById, insertRow } from '../config/supabaseClient.js';
import supabaseClient from '../config/supabaseClient.js';

const TABLE = 'prescriptions';

export async function addPrescription(payload) {
    return insertRow(TABLE, payload);
}

export async function getPrescriptionById(payload) {
    return getAllRowsById(TABLE, payload);
}

export async function getPrescriptionsByPatientId(id) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .select()
        .eq('patient_id', id);
    if (error) throw error;
    return data;
}