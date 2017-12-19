import { environment } from '../../environments/environment';
export const API_BASE_URL = environment.apiURL;
export const ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  refreshToken: `${API_BASE_URL}/refresh`,
};
