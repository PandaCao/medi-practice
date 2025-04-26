import * as reservationModel from '../models/reservationModel.js';

export async function addReservation(payload) {
    return await reservationModel.addReservation(payload);
}

export async function getReservation(payload) {
    return await reservationModel.getReservation(payload);
}

export async function getReservationsList() {
    return await reservationModel.getReservations();
}

export async function updateReservation(payload) {
    return await reservationModel.updateReservation(payload);
}

export async function deleteReservation(payload) {
    return await reservationModel.deleteReservation(payload);
}
