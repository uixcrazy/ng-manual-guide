import { environment } from '../../environments/environment';
export const API_BASE_URL = environment.apiURL;
export const ENDPOINTS = {
  signin: `${API_BASE_URL}/signin`,
  refreshToken: `${API_BASE_URL}/refresh`,
  changepass: `${API_BASE_URL}/changepass`
};
