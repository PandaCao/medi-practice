import * as reservationModel from '../models/reservationModel.js';

export async function deleteReservation(payload) {
    return await reservationModel.deleteReservation(payload);
}
