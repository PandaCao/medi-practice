import api from './config';

const RESERVATION_ENDPOINTS = {
  LIST: '/reservation/list',
  DETAIL: (id) => `/reservation/${id}`,
  ADD: '/reservation',
  UPDATE: '/reservation',
  DELETE: '/reservation',
};

/**
 * Create a new reservation
 * @param {Object} reservationData
 * @returns {Promise<Object>}
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post(RESERVATION_ENDPOINTS.ADD, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

/**
 * Get reservation by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getReservationById = async (id) => {
  try {
    const response = await api.get(RESERVATION_ENDPOINTS.DETAIL(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation by id:', error);
    throw error;
  }
};

/**
 * Get list of all reservations
 * @returns {Promise<Array>}
 */
export const getReservationsList = async () => {
  try {
    const response = await api.get(RESERVATION_ENDPOINTS.LIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations list:', error);
    throw error;
  }
};

/**
 * Update an existing reservation
 * @param {Object} reservationData
 * @returns {Promise<Object>}
 */
export const updateReservation = async (reservationData) => {
  try {
    const response = await api.patch(RESERVATION_ENDPOINTS.UPDATE, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

/**
 * Delete a reservation
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteReservation = async (id) => {
  try {
    const response = await api.delete(RESERVATION_ENDPOINTS.DELETE, { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};
