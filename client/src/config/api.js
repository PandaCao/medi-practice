// config/api.js

// V development prostředí použijeme localhost:5000, v produkci render.com
const API_BASE_URL = 'https://medipractise-server.onrender.com/api/v1';

// Endpointy
export const API_ENDPOINTS = {
    PATIENT_CARDS: {
        LIST: `${API_BASE_URL}/patientCards/list`,
        DETAIL: (id) => `${API_BASE_URL}/patientCards/list?id=${id}`,
    },
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

    // Převedení parametrů na URL query string
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${API_ENDPOINTS.PATIENT_CARDS.LIST}?${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching patient cards:', error);
        throw error;
    }
};

/**
 * Funkce pro získání detailu pacienta
 * @param {string} id - ID pacienta
 * @returns {Promise<Object>} - Promise s detailem pacienta
 */
export const getPatientCardDetail = async (id) => {
    try {
        const response = await fetch(API_ENDPOINTS.PATIENT_CARDS.DETAIL(id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching patient card detail:', error);
        throw error;
    }
};
