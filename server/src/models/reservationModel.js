import supabaseClient from '../config/supabaseClient.js';

const TABLE = 'reservation';


export async function deleteReservation(payload) {
    const response = await supabaseClient
        .from(TABLE)
        .delete()
        .eq('id', payload.id);
    return response;
}
