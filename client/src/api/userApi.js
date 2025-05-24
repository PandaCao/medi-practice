import api from './config';

const USER_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/auth/me',
};

/**
 * Přihlášení uživatele
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export const login = async (username, password) => {
  try {
    const response = await api.post(USER_ENDPOINTS.LOGIN, { username, password });
    return response.data; // { token, user }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Získání informací o přihlášeném uživateli
 * @param {string} token
 * @returns {Promise<{user: object}>}
 */
export const getMe = async (token) => {
  try {
    const response = await api.get(USER_ENDPOINTS.ME, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return response.data; // { user }
  } catch (error) {
    console.error('getMe error:', error);
    throw error;
  }
};
