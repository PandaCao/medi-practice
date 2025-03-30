import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const PATIENT_TABLE = 'patient_card';

async function paginate(data, pageNum, pageSize) {
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}

export async function addPatientCard(payload) {
    try {
        const { data, error } = await supabaseClient
            .from(PATIENT_TABLE)
            .insert([payload])
            .select();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error adding patient card:', err);
        throw err;
    }
}


export async function getPatientsFromDB({ search = '', page, pageSize }) {
    try {
        let data;
        let error;

        const isEmptySearch = !search.trim();

        if (isEmptySearch) {
            console.log('No filter, fetching all patients');
            ({ data, error } = await supabaseClient
                .from(PATIENT_TABLE)
                .select('*')
                .order('surname', { ascending: true }));
        } else {
            console.log('Filtering patients');
            const words = search.trim().split(/\s+/).filter(Boolean);

            const searchQuery = words
                .map(word =>
                    ['surname', 'name', 'rc']
                        .map(field => `${field}.ilike.%${word}%`)
                        .join(',')
                )
                .join(', ');

            ({ data, error } = await supabaseClient
                .from(PATIENT_TABLE)
                .select('*')
                .or(searchQuery)
                .order('surname', { ascending: true }));
        }

        if (error) throw error;

        if (pageSize > 0 && page > 0) {
            data = await paginate(data, page, pageSize);
        }

        return data;
    } catch (err) {
        console.error('Error fetching patients:', err);
        return err;
    }
}