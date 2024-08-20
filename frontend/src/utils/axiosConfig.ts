import axios, { AxiosError } from 'axios';

axios.defaults.withCredentials = true;

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

// Response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {

    // Handle token refresh errors (401 errors)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default axios;
