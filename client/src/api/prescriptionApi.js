import api from './config';

/**
 * Vytvoření e-receptu
 * @param {Object} prescriptionData - Data e-receptu
 * @returns {Promise<Object>} - Promise s vytvořeným e-receptem
 */
export const addPrescription = async (prescriptionData) => {
    try {
        const response = await api.post('/prescription/', prescriptionData);
        return response.data;
    } catch (error) {
        console.error('Error adding prescription:', error);
        throw error;
    }
};
