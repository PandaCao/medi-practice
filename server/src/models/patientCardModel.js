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

export async function fetchPatients({ search = '', pageIndex, pageSize }) {
    let data, error;
    const cleanedSearch = search.replace(/[\/\\]/g, '').trim();
    const words = cleanedSearch.split(/\s+/).filter(Boolean);

    if (words.length === 0) {
        ({ data, error } = await supabaseClient.from(TABLE).select('*').order('last_name', { ascending: true }));
    } else {
        const searchQuery = words
            .map(word => ['last_name_normalized', 'birth_number_clean'].map(f => `${f}.ilike.${word}%`).join(','))
            .join(',');
        ({ data, error } = await supabaseClient.from(TABLE).select('*').or(searchQuery).order('last_name'));
    }
    const totalCount = data.length;

    if (error) throw error;
    if (pageIndex && pageSize) {
        data = paginate(data, pageIndex, pageSize);
    }

    return {
        status: "200",
        pageIndex: pageIndex,
        pageSize: pageSize,
        numOfResults: totalCount,
        pageLimit: (pageIndex > 0 && pageSize > 0) ? Math.ceil(totalCount / pageSize) : 1,
        results: data
    }
}
