import supabaseClient from '../config/supabaseClient.js';
import { checkDates } from '../utils/validator.js';
import { log } from '../app.js';

const TABLE = 'reservation';

export async function addReservation(payload) {
    if(!checkDates(payload['start_date'], payload['end_date'])) throw new Error('end_date is before start_date!!!');

    const checkData = await supabaseClient
        .from(TABLE)
        .select('*')
        .lte('start_date', payload['end_date'])
        .gt('end_date', payload['start_date']);

    log.info(checkData);

    if (checkData.data.length === 0) {
        const { data, error } = await supabaseClient
            .from(TABLE)
            .insert([payload])
            .select();
        if (error) throw error;
        return data;
    } else {
        throw new Error('Reservation already exists');
    }
}

export async function getReservation(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .select()
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}

export async function getReservations() {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .select('*')
    if (error) throw error;
    return data;
}

export async function updateReservation(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .update([payload])
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}

export async function deleteReservation(payload) {
    const { data, error } = await supabaseClient
        .from(TABLE)
        .delete()
        .eq('id', payload['id']);
    if (error) throw error;
    return data;
}
