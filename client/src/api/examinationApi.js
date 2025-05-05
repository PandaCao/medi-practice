import api from './config';

// Endpointy pro vyšetření
const EXAMINATION_ENDPOINTS = {
    LIST: (patientId) => `/patientCards/${patientId}/examinations`,
    ADD: '/examinationRecords',
    UPDATE: '/examinationRecords',
};

/**
 * Funkce pro získání seznamu vyšetření pacienta
 * @param {string} patientId - ID pacienta
 * @returns {Promise<Array>} - Promise s seznamem vyšetření
 */
export const getPatientExaminations = async (patientId) => {
    try {
        const response = await api.get(EXAMINATION_ENDPOINTS.LIST(patientId));
        return response.data;
    } catch (error) {
        console.error('Error fetching patient examinations:', error);
        throw error;
    }
};

/**
 * Funkce pro přidání nového vyšetření
 * @param {Object} examinationData - Data vyšetření
 * @returns {Promise<Object>} - Promise s vytvořeným vyšetřením
 */
export const addExamination = async (examinationData) => {
    try {
        const response = await api.post(
            EXAMINATION_ENDPOINTS.ADD,
            examinationData,
        );
        return response.data;
    } catch (error) {
        console.error('Error adding examination:', error);
        throw error;
    }
};

/**
 * Funkce pro úpravu existujícího vyšetření
 * @param {Object} examinationData - Data vyšetření včetně id
 * @returns {Promise<Object>} - Promise s upraveným vyšetřením
 */
export const updateExamination = async (examinationData) => {
    try {
        const response = await api.patch(
            EXAMINATION_ENDPOINTS.UPDATE,
            examinationData,
        );
        return response.data;
    } catch (error) {
        console.error('Error updating examination:', error);
        throw error;
    }
};
