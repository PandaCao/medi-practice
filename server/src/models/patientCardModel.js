import supabaseClient from '../config/supabaseClient.js';

const TABLE = 'patient_card';

function paginate(data, pageNum, pageSize) {
    const start = (pageNum - 1) * pageSize;
    return data.slice(start, start + pageSize);
}

export async function insertPatient(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .insert([payload])
        .select();
    if (error) throw error;
    return data;
}

export async function fetchPatients({ search = '', page, pageSize }) {
    let data, error;
    const words = search.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) {
        ({ data, error } = await supabaseClient.from(TABLE).select('*').order('first_name', { ascending: true }));
    } else {
        const searchQuery = words
            .map(word => ['last_name', 'first_name', 'birth_number'].map(f => `${f}.ilike.%${word}%`).join(','))
            .join(',');
        ({ data, error } = await supabaseClient.from(TABLE).select('*').or(searchQuery).order('last_name'));
    }

    if (error) throw error;
    return (page && pageSize) ? paginate(data, page, pageSize) : data;
}
