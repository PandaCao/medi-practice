import supabaseClient from '../config/supabaseClient.js';

const TABLE = 'examination_record';


export async function insertExamination(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .insert([payload])
        .select();
    if (error) throw error;
    return data;
}

export async function updateExamination(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .update([payload])
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}