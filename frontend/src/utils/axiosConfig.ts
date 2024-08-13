import axios from 'axios';
import { refreshAccessToken } from './auth';

// Request interceptor to add the access token to headers
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and retry
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        await refreshAccessToken();

        // Retry the original request with the fresh accessToken
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure
        console.error('Token refresh failure:', refreshError);

        // Redirect user to login page
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
