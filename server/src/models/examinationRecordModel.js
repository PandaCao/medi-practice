import supabase, { insertRow, updateRowById } from '../config/supabaseClient.js';

const TABLE = 'examination_record';

export async function insertExamination(payload) {
    return insertRow(TABLE, payload);
}

export async function updateExamination(payload) {
    return updateRowById(TABLE, payload);
}

export async function getAllExaminationsByPatientId(id) {
    const { data, error } = await supabase
        .from(TABLE)
        .select()
        .eq('patient_id', id)
    if (error) throw error;
    return data;
}