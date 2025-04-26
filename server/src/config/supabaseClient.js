import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default supabase;

export async function insertRow(table, payload) {
    const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select();
    if (error) throw error;
    return data;
}

export async function getAllRows(table) {
    const { data, error } = await supabase
        .from(table)
        .select('*');
    if (error) throw error;
    return data;
}

export async function getAllRowsById(table, payload) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}

export async function updateRowById(table, payload) {
    const { data, error } = await supabase
        .from(table)
        .update([payload])
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}
