import api from './config';

// Endpointy pro pacienty
const PATIENT_ENDPOINTS = {
    LIST: '/patientCards/list',
    DETAIL: (id) => `/patientCards/get?id=${id}`,
};

// Výchozí parametry pro pagination
const DEFAULT_PAGINATION = {
    pageIndex: 1,
    pageSize: 10,
};

/**
 * Funkce pro získání seznamu pacientů
 * @param {Object} params - Parametry pro vyhledávání a pagination
 * @param {string} params.search - Text pro vyhledávání (jméno, příjmení, rodné číslo)
 * @param {number} params.pageIndex - Číslo aktuální stránky
 * @param {number} params.pageSize - Počet položek na stránku
 * @returns {Promise<Object>} - Promise s výsledky vyhledávání
 */
export const getPatientCards = async (params = {}) => {
    const searchParams = {
        ...DEFAULT_PAGINATION,
        ...params,
        id: '',
        rc: '',
    };

    try {
        const response = await api.get(PATIENT_ENDPOINTS.LIST, {
            params: searchParams,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching patient cards:', error);
        throw error;
    }
};

/**
 * Funkce pro získání detailu pacienta podle ID
 * @param {string} id - ID pacienta
 * @returns {Promise<Object>} - Promise s detailem pacienta
 */
export const getPatientDetail = async (id) => {
    try {
        const response = await api.get(PATIENT_ENDPOINTS.DETAIL(id));
        return response.data.results[0]; // Vrátíme prvního (a jediného) pacienta z výsledků
    } catch (error) {
        console.error('Error fetching patient detail:', error);
        throw error;
    }
};
