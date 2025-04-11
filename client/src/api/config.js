import axios from 'axios';

const API_BASE_URL = 'https://medipractise-server.onrender.com/api/v1';

// Vytvoření instance Axios s výchozí konfigurací
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Přidání interceptoru pro error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    },
);

export default api;
