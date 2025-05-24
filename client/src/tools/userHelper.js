// userHelper.js
// Pomocné funkce pro práci s uživateli a autentizací
import { ROLE_PERMISSIONS } from '../config/permissions';

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

export function getDoctorId() {
  const user = getUser();
  return user && user.role === 'doctor' ? user.id : null;
}

export function getNurseId() {
  const user = getUser();
  return user && user.role === 'nurse' ? user.id : null;
}

export function hasPermission(permission) {
  const user = getUser();
  if (!user) return false;
  const rolePerms = ROLE_PERMISSIONS[user.role] || [];
  return rolePerms.includes(permission);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
