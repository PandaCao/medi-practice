import api from './config';

// Endpointy pro pacienty
const PATIENT_ENDPOINTS = {
    LIST: '/patientCards/list',
    DETAIL: (id) => `/patientCards/${id}`,
    ADD: '/patientCards',
    UPDATE: '/patientCards',
    EXAMINATIONS: (id) => `/patientCards/${id}/examinations`,
    PRESCRIPTIONS: (id) => `/patientCards/${id}/prescriptions`,
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
        return response.data.results[0];
    } catch (error) {
        console.error('Error fetching patient detail:', error);
        throw error;
    }
};

/**
 * Funkce pro přidání nového pacienta
 * @param {Object} patientData - Data pacienta
 * @param {string} patientData.first_name - Jméno pacienta
 * @param {string} patientData.last_name - Příjmení pacienta
 * @param {string} patientData.date_of_birth - Datum narození
 * @param {string} patientData.birth_number - Rodné číslo
 * @param {string} patientData.insurance_id - Číslo pojištění
 * @param {string} patientData.sex - Pohlaví
 * @param {Object} [patientData.contact_info] - Kontaktní informace
 * @param {Object} [patientData.address] - Adresa
 * @param {number} [patientData.weight] - Váha
 * @param {number} [patientData.height] - Výška
 * @returns {Promise<Object>} - Promise s vytvořeným pacientem
 */
export const addPatient = async (patientData) => {
    try {
        const response = await api.post(PATIENT_ENDPOINTS.ADD, patientData);
        return response.data;
    } catch (error) {
        console.error('Error adding patient:', error);
        throw error;
    }
};

/**
 * Funkce pro získání vyšetření pacienta
 * @param {string} id - ID pacienta
 * @returns {Promise<Array>} - Promise s seznamem vyšetření
 */
export const getPatientExaminations = async (id) => {
    try {
        const response = await api.get(PATIENT_ENDPOINTS.EXAMINATIONS(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching patient examinations:', error);
        throw error;
    }
};

/**
 * Funkce pro získání předpisů pacienta
 * @param {string} id - ID pacienta
 * @returns {Promise<Array>} - Promise s seznamem předpisů
 */
export const getPatientPrescriptions = async (id) => {
    try {
        const response = await api.get(PATIENT_ENDPOINTS.PRESCRIPTIONS(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching patient prescriptions:', error);
        throw error;
    }
};

/**
 * Funkce pro úpravu existujícího pacienta
 * @param {Object} patientData - Data pacienta včetně id
 * @returns {Promise<Object>} - Promise s upraveným pacientem
 */
export const updatePatient = async (patientData) => {
    try {
        const response = await api.patch(PATIENT_ENDPOINTS.UPDATE, patientData);
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};
