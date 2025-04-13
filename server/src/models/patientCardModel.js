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

export async function fetchPatients({ id, search = '', pageIndex, pageSize }) {
    let data, error;
    const cleanedSearch = search.replace(/[\/\\]/g, '').trim();
    const words = cleanedSearch.split(/\s+/).filter(Boolean);
    if (id) {
        ({ data, error } = await supabaseClient.from(TABLE).select('*').eq('user_id', id));
    }
    else if (words.length === 0) {
        ({ data, error } = await supabaseClient.from(TABLE).select('*').order('created_at', { ascending: false }));
    } else {
        const searchQuery = words
            .map(word => ['last_name_normalized', 'birth_number_clean'].map(f => `${f}.ilike.${word}%`).join(','))
            .join(',');
        ({ data, error } = await supabaseClient.from(TABLE).select('*').or(searchQuery).order('created_at', { ascending: false }));
    }
    const totalCount = data !== null ? data.length : 0;

    if (error) throw error;
    const response = {
        status: "200",
        numOfResults: totalCount,
        pageLimit: (pageIndex > 0 && pageSize > 0 && !id) ? Math.ceil(totalCount / pageSize) : 1
    };
    if (pageIndex && pageSize && !id) {
        data = paginate(data, pageIndex, pageSize);
        response.pageIndex = pageIndex;
        response.pageSize = pageSize;
    }
    response.results = data;

    return response;
}
